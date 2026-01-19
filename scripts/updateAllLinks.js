/**
 * Update all scheme links to proper government application portals
 * This script updates links based on scheme names/types without strict validation
 * (since many government sites are slow but still functional)
 */

const mongoose = require('mongoose');
require('dotenv').config();

const Scheme = require('../models/Scheme');

// Comprehensive mapping of scheme names to proper application links
const SCHEME_LINKS = {
  // Visual Impairment Schemes
  "ADIP Scheme": "https://disabilityaffairs.gov.in/content/page/adip.php",
  "National Scholarship for Persons with Disabilities": "https://scholarships.gov.in/",
  "Accessible India Campaign (Sugamya Bharat Abhiyan)": "https://accessibleindia.gov.in/",
  "Bookshare India": "https://www.bookshare.org/",
  "Braille Press Scheme": "https://disabilityaffairs.gov.in/",
  "National Programme for Control of Blindness (NPCB)": "https://npcbvi.gov.in/",
  "Scholarship for Blind Students (All India Confederation of the Blind)": "https://aicb.org.in/",
  "Pre-matric Scholarship for Students with Disabilities": "https://scholarships.gov.in/",
  "Post-matric Scholarship for Students with Disabilities": "https://scholarships.gov.in/",
  "Free Coaching for Students with Disabilities": "https://disabilityaffairs.gov.in/",
  "Skill Training for Persons with Visual Impairment": "https://nivh.gov.in/",
  "Railway Concession for Blind Persons": "https://www.indianrailways.gov.in/",
  "Loan Scheme for Visually Impaired Entrepreneurs": "https://www.nhfdc.nic.in/",
  
  // Hearing Impairment Schemes
  "Assistance to Hearing Handicapped for Purchase/Fitting of Aids and Appliances": "https://disabilityaffairs.gov.in/content/page/adip.php",
  "Indian Sign Language Research and Training Centre (ISLRTC)": "https://islrtc.nic.in/",
  "Cochlear Implant Scheme": "https://disabilityaffairs.gov.in/content/page/adip.php",
  "Scholarship for Students with Hearing Impairment": "https://scholarships.gov.in/",
  "Scheme for Implementation of Persons with Disabilities Act (SIPDA)": "https://disabilityaffairs.gov.in/content/page/sipda.php",
  "Skill Training for Persons with Hearing Impairment": "https://niepid.nic.in/",
  "Railway Concession for Hearing Impaired Persons": "https://www.indianrailways.gov.in/",
  "Loan Scheme for Hearing Impaired Entrepreneurs": "https://www.nhfdc.nic.in/",
  "Pre-matric Scholarship for Students with Hearing Impairment": "https://scholarships.gov.in/",
  "Post-matric Scholarship for Students with Hearing Impairment": "https://scholarships.gov.in/",
  "Free Coaching for Students with Hearing Impairment": "https://disabilityaffairs.gov.in/",
  "Skill Training for Hearing Impaired Women": "https://niepmd.tn.nic.in/",
  "Disability Pension Scheme for Hearing Impaired": "https://disabilityaffairs.gov.in/",
  
  // Intellectual Disability Schemes
  "Deendayal Disabled Rehabilitation Scheme (DDRS)": "https://disabilityaffairs.gov.in/content/page/ddrs.php",
  "Niramaya Health Insurance Scheme": "https://thenationaltrust.gov.in/",
  "Gharaunda Scheme": "https://thenationaltrust.gov.in/",
  "Samarth Scheme": "https://thenationaltrust.gov.in/",
  "Vikaas Day Care Scheme": "https://thenationaltrust.gov.in/",
  "Disha Early Intervention and School Readiness Scheme": "https://thenationaltrust.gov.in/",
  "Prerna Marketing Assistance Scheme": "https://thenationaltrust.gov.in/",
  "Sahyogi Caregiver Training Scheme": "https://thenationaltrust.gov.in/",
  "Gyan Prabha Educational Support Scheme": "https://thenationaltrust.gov.in/",
  "Arunim Livelihood Scheme": "https://thenationaltrust.gov.in/",
  "Niramaya Health Insurance Renewal Scheme": "https://thenationaltrust.gov.in/",
  "Disability Pension Scheme for Intellectual Disabilities": "https://disabilityaffairs.gov.in/",
  "Scholarship for Students with Intellectual Disabilities": "https://scholarships.gov.in/",
  "Free Coaching for Students with Intellectual Disabilities": "https://disabilityaffairs.gov.in/",
  
  // Physical Disability Schemes
  "Unique Disability ID (UDID) Project": "https://www.swavlambancard.gov.in/",
  "ADIP Scheme (for Physical Disabilities)": "https://disabilityaffairs.gov.in/content/page/adip.php",
  "Scheme for Providing Employment to Persons with Disabilities in the Private Sector": "https://disabilityaffairs.gov.in/content/page/employment.php",
  "Scholarship for Students with Physical Disabilities": "https://scholarships.gov.in/",
  "Skill Training for Persons with Physical Disabilities": "https://niepid.nic.in/",
  "Railway Concession for Persons with Physical Disabilities": "https://www.indianrailways.gov.in/",
  "Loan Scheme for Physically Disabled Entrepreneurs": "https://www.nhfdc.nic.in/",
  "Pre-matric Scholarship for Students with Physical Disabilities": "https://scholarships.gov.in/",
  "Post-matric Scholarship for Students with Physical Disabilities": "https://scholarships.gov.in/",
  "Free Coaching for Students with Physical Disabilities": "https://disabilityaffairs.gov.in/",
  "Skill Training for Women with Physical Disabilities": "https://niepmd.tn.nic.in/",
  "Disability Pension Scheme for Physical Disabilities": "https://disabilityaffairs.gov.in/",
  "Incentive Scheme for Employers in the Private Sector for Providing Employment to Persons with Disabilities": "https://disabilityaffairs.gov.in/content/page/employment.php",
};

/**
 * Get proper link for a scheme
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
    return "https://thenationaltrust.gov.in/";
  }

  if (combined.includes('scholarship') || combined.includes('education')) {
    return "https://scholarships.gov.in/";
  }
  if (combined.includes('loan') || combined.includes('finance') || combined.includes('funding') || combined.includes('nhfdc')) {
    return "https://www.nhfdc.nic.in/";
  }
  if (combined.includes('employment') || combined.includes('job') || combined.includes('career')) {
    return "https://disabilityaffairs.gov.in/content/page/employment.php";
  }
  if (combined.includes('railway') || combined.includes('train') || combined.includes('concession')) {
    return "https://www.indianrailways.gov.in/";
  }
  if (combined.includes('bookshare') || combined.includes('book share')) {
    return "https://www.bookshare.org/";
  }
  if (combined.includes('adip') || combined.includes('aids') || combined.includes('appliances')) {
    return "https://disabilityaffairs.gov.in/content/page/adip.php";
  }
  if (combined.includes('disability') || combined.includes('handicap')) {
    return "https://disabilityaffairs.gov.in/";
  }

  // Default to general disability affairs portal
  return "https://disabilityaffairs.gov.in/";
}

/**
 * Main function to update all links
 */
async function updateAllLinks() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/informaid');
    console.log('Connected to MongoDB\n');

    // Get all schemes
    const schemes = await Scheme.find({});
    console.log(`Found ${schemes.length} schemes to update\n`);

    let updated = 0;
    let unchanged = 0;
    const updates = [];

    for (const scheme of schemes) {
      const currentLink = scheme.official_link || '';
      const newLink = getProperLink(scheme);
      
      if (currentLink === newLink) {
        unchanged++;
        continue;
      }

      // Update the scheme
      scheme.official_link = newLink;
      await scheme.save();
      
      console.log(`✓ Updated: ${scheme.name}`);
      console.log(`  Old: ${currentLink || '(empty)'}`);
      console.log(`  New: ${newLink}\n`);
      
      updated++;
      updates.push({
        scheme: scheme.name,
        oldLink: currentLink,
        newLink: newLink
      });
    }

    // Summary
    console.log('='.repeat(60));
    console.log('SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total schemes: ${schemes.length}`);
    console.log(`Updated: ${updated}`);
    console.log(`Unchanged: ${unchanged}`);
    console.log('='.repeat(60));

    await mongoose.disconnect();
    console.log('\n✓ Disconnected from MongoDB');
    console.log('\n✓ All links have been updated to proper government application portals!');
    
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
  updateAllLinks();
}

module.exports = { updateAllLinks, getProperLink };




