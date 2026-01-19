/**
 * Script to check and fix broken apply links for all schemes
 * Validates URLs and updates with proper government application portals
 */

const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const Scheme = require('../models/Scheme');

// Mapping of scheme names to proper application links
const SCHEME_LINKS = {
  // Visual Impairment Schemes
  "ADIP Scheme": "https://disabilityaffairs.gov.in/content/page/adip.php",
  "National Scholarship for Persons with Disabilities": "https://scholarships.gov.in/",
  "Accessible India Campaign (Sugamya Bharat Abhiyan)": "https://accessibleindia.gov.in/",
  "Bookshare India": "https://www.bookshare.org/cms/bookshare-meets-india",
  "Braille Press Scheme": "https://disabilityaffairs.gov.in/",
  "National Programme for Control of Blindness (NPCB)": "https://npcbvi.gov.in/",
  "Scholarship for Blind Students (All India Confederation of the Blind)": "https://aicb.org.in/",
  "Pre-matric Scholarship for Students with Disabilities": "https://scholarships.gov.in/",
  "Post-matric Scholarship for Students with Disabilities": "https://scholarships.gov.in/",
  "Free Coaching for Students with Disabilities": "https://disabilityaffairs.gov.in/",
  "Skill Training for Persons with Visual Impairment": "https://nivh.gov.in/",
  "Railway Concession for Blind Persons": "https://www.indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,1,304,366,537,537",
  "Loan Scheme for Visually Impaired Entrepreneurs": "https://nhfdc.nic.in/",
  
  // Hearing Impairment Schemes
  "Assistance to Hearing Handicapped for Purchase/Fitting of Aids and Appliances": "https://disabilityaffairs.gov.in/content/page/adip.php",
  "Indian Sign Language Research and Training Centre (ISLRTC)": "https://islrtc.nic.in/",
  "Cochlear Implant Scheme": "https://disabilityaffairs.gov.in/content/page/adip.php",
  "Scholarship for Students with Hearing Impairment": "https://scholarships.gov.in/",
  "Scheme for Implementation of Persons with Disabilities Act (SIPDA)": "https://disabilityaffairs.gov.in/content/page/sipda.php",
  "Skill Training for Persons with Hearing Impairment": "https://niepid.nic.in/",
  "Railway Concession for Hearing Impaired Persons": "https://www.indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,1,304,366,537,537",
  "Loan Scheme for Hearing Impaired Entrepreneurs": "https://nhfdc.nic.in/",
  "Pre-matric Scholarship for Students with Hearing Impairment": "https://scholarships.gov.in/",
  "Post-matric Scholarship for Students with Hearing Impairment": "https://scholarships.gov.in/",
  "Free Coaching for Students with Hearing Impairment": "https://disabilityaffairs.gov.in/",
  "Skill Training for Hearing Impaired Women": "https://niepmd.tn.nic.in/",
  "Disability Pension Scheme for Hearing Impaired": "https://disabilityaffairs.gov.in/",
  
  // Intellectual Disability Schemes
  "Deendayal Disabled Rehabilitation Scheme (DDRS)": "https://disabilityaffairs.gov.in/content/page/ddrs.php",
  "Niramaya Health Insurance Scheme": "https://thenationaltrust.gov.in/content/scheme/niramaya.php",
  "Gharaunda Scheme": "https://thenationaltrust.gov.in/content/scheme/gharaunda.php",
  "Samarth Scheme": "https://thenationaltrust.gov.in/content/scheme/samarth.php",
  "Vikaas Day Care Scheme": "https://thenationaltrust.gov.in/content/scheme/vikaas.php",
  "Disha Early Intervention and School Readiness Scheme": "https://thenationaltrust.gov.in/content/scheme/disha.php",
  "Prerna Marketing Assistance Scheme": "https://thenationaltrust.gov.in/content/scheme/prerna.php",
  "Sahyogi Caregiver Training Scheme": "https://thenationaltrust.gov.in/content/scheme/sahyogi.php",
  "Gyan Prabha Educational Support Scheme": "https://thenationaltrust.gov.in/content/scheme/gyanprabha.php",
  "Arunim Livelihood Scheme": "https://thenationaltrust.gov.in/content/scheme/arunim.php",
  "Niramaya Health Insurance Renewal Scheme": "https://thenationaltrust.gov.in/content/scheme/niramaya.php",
  "Disability Pension Scheme for Intellectual Disabilities": "https://disabilityaffairs.gov.in/",
  "Scholarship for Students with Intellectual Disabilities": "https://scholarships.gov.in/",
  "Free Coaching for Students with Intellectual Disabilities": "https://disabilityaffairs.gov.in/",
  
  // Physical Disability Schemes
  "Unique Disability ID (UDID) Project": "https://www.swavlambancard.gov.in/",
  "ADIP Scheme (for Physical Disabilities)": "https://disabilityaffairs.gov.in/content/page/adip.php",
  "Scheme for Providing Employment to Persons with Disabilities in the Private Sector": "https://disabilityaffairs.gov.in/content/page/employment.php",
  "Scholarship for Students with Physical Disabilities": "https://scholarships.gov.in/",
  "Skill Training for Persons with Physical Disabilities": "https://niepid.nic.in/",
  "Railway Concession for Persons with Physical Disabilities": "https://www.indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,1,304,366,537,537",
  "Loan Scheme for Physically Disabled Entrepreneurs": "https://nhfdc.nic.in/",
  "Pre-matric Scholarship for Students with Physical Disabilities": "https://scholarships.gov.in/",
  "Post-matric Scholarship for Students with Physical Disabilities": "https://scholarships.gov.in/",
  "Free Coaching for Students with Physical Disabilities": "https://disabilityaffairs.gov.in/",
  "Skill Training for Women with Physical Disabilities": "https://niepmd.tn.nic.in/",
  "Disability Pension Scheme for Physical Disabilities": "https://disabilityaffairs.gov.in/",
  "Incentive Scheme for Employers in the Private Sector for Providing Employment to Persons with Disabilities": "https://disabilityaffairs.gov.in/content/page/employment.php",
};

// Generic application portals based on scheme type
const GENERIC_LINKS = {
  scholarship: "https://scholarships.gov.in/",
  scholarship_alt: "https://www.scholarships.gov.in/",
  disability: "https://disabilityaffairs.gov.in/",
  employment: "https://disabilityaffairs.gov.in/content/page/employment.php",
  loan: "https://nhfdc.nic.in/",
  loan_alt: "https://www.nhfdc.nic.in/",
  railway: "https://www.indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,1,304,366,537,537",
  general: "https://disabilityaffairs.gov.in/",
  nationaltrust: "https://thenationaltrust.gov.in/",
  bookshare: "https://www.bookshare.org/"
};

/**
 * Check if a URL is valid and accessible
 */
async function checkLink(url) {
  if (!url || url.trim() === '') {
    return { valid: false, reason: 'Empty URL' };
  }

  try {
    // Validate URL format
    new URL(url);
  } catch (e) {
    return { valid: false, reason: 'Invalid URL format' };
  }

  try {
    // Try to fetch the URL (with timeout)
    const response = await axios.head(url, {
      timeout: 5000,
      maxRedirects: 5,
      validateStatus: (status) => status < 500 // Accept 2xx, 3xx, 4xx but not 5xx
    });
    
    // Consider 2xx and 3xx as valid, 4xx and 5xx as invalid
    if (response.status >= 200 && response.status < 400) {
      return { valid: true, status: response.status };
    } else {
      return { valid: false, reason: `HTTP ${response.status}` };
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      return { valid: false, reason: 'Connection failed or timeout' };
    }
    if (error.response) {
      return { valid: false, reason: `HTTP ${error.response.status}` };
    }
    return { valid: false, reason: error.message };
  }
}

/**
 * Get appropriate link for a scheme
 */
function getProperLink(scheme) {
  const schemeName = scheme.name.trim();
  
  // Check if we have a specific link for this scheme
  if (SCHEME_LINKS[schemeName]) {
    return SCHEME_LINKS[schemeName];
  }

  // Try to match based on keywords
  const nameLower = schemeName.toLowerCase();
  const descLower = (scheme.short_description || '').toLowerCase();
  const combined = nameLower + ' ' + descLower;

  // National Trust schemes
  if (combined.includes('niramaya') || combined.includes('gharaunda') || 
      combined.includes('samarth') || combined.includes('vikaas') ||
      combined.includes('disha') || combined.includes('prerna') ||
      combined.includes('sahyogi') || combined.includes('gyan prabha') ||
      combined.includes('arunim') || combined.includes('national trust')) {
    return GENERIC_LINKS.nationaltrust;
  }

  if (combined.includes('scholarship') || combined.includes('education')) {
    return GENERIC_LINKS.scholarship;
  }
  if (combined.includes('loan') || combined.includes('finance') || combined.includes('funding') || combined.includes('nhfdc')) {
    return GENERIC_LINKS.loan_alt || GENERIC_LINKS.loan;
  }
  if (combined.includes('employment') || combined.includes('job') || combined.includes('career')) {
    return GENERIC_LINKS.employment;
  }
  if (combined.includes('railway') || combined.includes('train') || combined.includes('concession')) {
    return GENERIC_LINKS.railway;
  }
  if (combined.includes('bookshare') || combined.includes('book share')) {
    return GENERIC_LINKS.bookshare;
  }
  if (combined.includes('disability') || combined.includes('handicap')) {
    return GENERIC_LINKS.disability;
  }

  // Default to general disability affairs portal
  return GENERIC_LINKS.general;
}

/**
 * Main function to check and fix all links
 */
async function checkAndFixLinks() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/informaid');
    console.log('Connected to MongoDB');

    // Get all schemes
    const schemes = await Scheme.find({});
    console.log(`\nFound ${schemes.length} schemes to check\n`);

    let checked = 0;
    let fixed = 0;
    let alreadyValid = 0;
    const issues = [];

    for (const scheme of schemes) {
      checked++;
      const currentLink = scheme.official_link || '';
      
      console.log(`[${checked}/${schemes.length}] Checking: ${scheme.name}`);
      console.log(`  Current link: ${currentLink || '(empty)'}`);

      // Check if link is valid
      const linkCheck = await checkLink(currentLink);
      
      if (linkCheck.valid) {
        console.log(`  ✓ Link is valid (HTTP ${linkCheck.status})\n`);
        alreadyValid++;
        continue;
      }

      // Link is invalid, find a replacement
      console.log(`  ✗ Link is invalid: ${linkCheck.reason}`);
      const newLink = getProperLink(scheme);
      console.log(`  → Replacing with: ${newLink}`);

      // Verify the new link is valid (with more lenient checking)
      const newLinkCheck = await checkLink(newLink);
      
      // If new link is valid OR if old link was completely broken (empty, invalid format, etc.)
      // and new link is at least a valid URL format, update it
      const oldLinkWasBroken = !currentLink || currentLink.trim() === '' || 
                                linkCheck.reason === 'Empty URL' || 
                                linkCheck.reason === 'Invalid URL format';
      
      if (newLinkCheck.valid || (oldLinkWasBroken && new URL(newLink))) {
        // Update the scheme
        scheme.official_link = newLink;
        await scheme.save();
        console.log(`  ✓ Updated successfully\n`);
        fixed++;
        issues.push({
          scheme: scheme.name,
          oldLink: currentLink,
          newLink: newLink,
          reason: linkCheck.reason,
          fixed: true
        });
      } else {
        // Try alternative links for specific cases
        let alternativeLink = null;
        
        if (newLink.includes('scholarships.gov.in')) {
          alternativeLink = GENERIC_LINKS.scholarship_alt;
        } else if (newLink.includes('nhfdc.nic.in')) {
          alternativeLink = GENERIC_LINKS.loan_alt;
        } else if (newLink.includes('thenationaltrust.gov.in')) {
          alternativeLink = GENERIC_LINKS.nationaltrust;
        }
        
        if (alternativeLink && alternativeLink !== newLink) {
          const altCheck = await checkLink(alternativeLink);
          if (altCheck.valid || oldLinkWasBroken) {
            scheme.official_link = alternativeLink;
            await scheme.save();
            console.log(`  ✓ Updated with alternative link: ${alternativeLink}\n`);
            fixed++;
            issues.push({
              scheme: scheme.name,
              oldLink: currentLink,
              newLink: alternativeLink,
              reason: linkCheck.reason,
              fixed: true
            });
          } else {
            console.log(`  ⚠ Warning: All links invalid. Keeping: ${newLink}\n`);
            issues.push({
              scheme: scheme.name,
              oldLink: currentLink,
              newLink: newLink,
              reason: `All links invalid. Old: ${linkCheck.reason}`,
              notFixed: true
            });
          }
        } else {
          // Even if link check fails, update if old was completely broken
          if (oldLinkWasBroken) {
            scheme.official_link = newLink;
            await scheme.save();
            console.log(`  ✓ Updated (old link was broken, new link may need verification)\n`);
            fixed++;
            issues.push({
              scheme: scheme.name,
              oldLink: currentLink,
              newLink: newLink,
              reason: linkCheck.reason,
              fixed: true,
              needsVerification: true
            });
          } else {
            console.log(`  ⚠ Warning: Replacement link also invalid: ${newLinkCheck.reason}`);
            console.log(`  Keeping original link for manual review\n`);
            issues.push({
              scheme: scheme.name,
              oldLink: currentLink,
              newLink: newLink,
              reason: `Both links invalid. Old: ${linkCheck.reason}, New: ${newLinkCheck.reason}`,
              notFixed: true
            });
          }
        }
      }

      // Small delay to avoid overwhelming servers
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total schemes checked: ${checked}`);
    console.log(`Already valid: ${alreadyValid}`);
    console.log(`Fixed: ${fixed}`);
    console.log(`Issues found: ${issues.length}`);
    console.log('='.repeat(60));

    if (issues.length > 0) {
      console.log('\nIssues:');
      issues.forEach((issue, index) => {
        console.log(`\n${index + 1}. ${issue.scheme}`);
        console.log(`   Old: ${issue.oldLink || '(empty)'}`);
        console.log(`   New: ${issue.newLink}`);
        console.log(`   Reason: ${issue.reason}`);
        if (issue.notFixed) {
          console.log(`   ⚠ NOT FIXED - Needs manual review`);
        }
      });
    }

    await mongoose.disconnect();
    console.log('\n✓ Disconnected from MongoDB');
    
  } catch (error) {
    console.error('Error:', error);
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  checkAndFixLinks();
}

module.exports = { checkAndFixLinks, checkLink, getProperLink };

