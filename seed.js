const mongoose = require('mongoose');
require('dotenv').config();

const Scheme = require('./models/Scheme');

const schemes = [
// ------------------- Visual Impairment (1) -------------------
{
  name: "ADIP Scheme",
  short_description: "Financial assistance for purchase/fitting of aids and appliances for persons with disabilities.",
  full_description: "The ADIP Scheme aims at helping disabled persons by bringing suitable, durable, scientifically-manufactured, modern, standard aids and appliances within their reach.",
  eligibility: [
    "Indian citizen with 40% or more disability",
    "Monthly income not exceeding Rs. 22,500/-",
    "Not received assistance during the last 3 years for the same purpose"
  ],
  benefits: [
    "Financial assistance for aids/appliances",
    "100% assistance for income below Rs. 15,000/-",
    "50% assistance for income between Rs. 15,000/- and Rs. 22,500/-"
  ],
  documents_required: [
    "Disability certificate",
    "Income certificate",
    "Aadhar card",
    "Bank account details"
  ],
  application_process: [
    "Contact nearest ALIMCO office or authorized agency",
    "Submit application with required documents",
    "Assessment by medical board",
    "Receive approval and aids/appliances"
  ],
  official_link: "https://disabilityaffairs.gov.in/",
  disability_type: 1
},
{
  name: "National Scholarship for Persons with Disabilities",
  short_description: "Scholarships for students with disabilities for pursuing higher education.",
  full_description: "The scheme provides financial assistance to students with disabilities to pursue higher and technical education.",
  eligibility: [
    "Indian citizen with 40% or more disability",
    "Passed previous qualifying examination",
    "Family income not exceeding Rs. 2.5 lakh per annum"
  ],
  benefits: [
    "Scholarship amount varies by course",
    "Book grant and maintenance allowance"
  ],
  documents_required: [
    "Disability certificate",
    "Income certificate",
    "Marksheet of previous exam"
  ],
  application_process: [
    "Apply online on National Scholarship Portal",
    "Upload required documents",
    "Verification by institution and sanctioning authority"
  ],
  official_link: "https://scholarships.gov.in/",
  disability_type: 1
},
{
  name: "Accessible India Campaign (Sugamya Bharat Abhiyan)",
  short_description: "Making public infrastructure accessible for persons with disabilities.",
  full_description: "A flagship campaign to make government buildings, transport systems, and information accessible to persons with disabilities.",
  eligibility: [
    "All persons with disabilities in India"
  ],
  benefits: [
    "Barrier-free access to public infrastructure",
    "Accessible transport and information systems"
  ],
  documents_required: [
    "No documents required for beneficiaries"
  ],
  application_process: [
    "No direct application; implemented by government agencies"
  ],
  official_link: "https://disabilityaffairs.gov.in/",
  disability_type: 1
},
{
  name: "Bookshare India",
  short_description: "Online library for people with print disabilities.",
  full_description: "Bookshare is an online library that makes reading easier for people with visual impairments and other print disabilities.",
  eligibility: [
    "Indian citizen with print disability (visual, physical, or learning)"
  ],
  benefits: [
    "Access to thousands of accessible books",
    "Download in audio, braille, or large print formats"
  ],
  documents_required: [
    "Proof of disability"
  ],
  application_process: [
    "Register online on Bookshare India website",
    "Upload proof of disability"
  ],
  official_link: "https://www.bookshare.org/cms/bookshare-meets-india",
  disability_type: 1
},
{
  name: "Braille Press Scheme",
  short_description: "Support for production and distribution of Braille books.",
  full_description: "The scheme supports the production and distribution of Braille books for visually impaired students.",
  eligibility: [
    "Visually impaired students in India"
  ],
  benefits: [
    "Free or subsidized Braille books"
  ],
  documents_required: [
    "Proof of visual impairment"
  ],
  application_process: [
    "Contact designated Braille press or school"
  ],
  official_link: "https://disabilityaffairs.gov.in/",
  disability_type: 1
},
{
  name: "National Programme for Control of Blindness (NPCB)",
  short_description: "Prevention and control of blindness in India.",
  full_description: "NPCB aims to reduce the prevalence of blindness through various interventions including free eye surgeries and distribution of spectacles.",
  eligibility: [
    "Indian citizens with visual impairment or at risk of blindness"
  ],
  benefits: [
    "Free eye check-ups and surgeries",
    "Distribution of spectacles"
  ],
  documents_required: [
    "Medical records"
  ],
  application_process: [
    "Contact nearest government hospital or health center"
  ],
  official_link: "https://npcbvi.gov.in/",
  disability_type: 1
},
{
  name: "Scholarship for Blind Students (All India Confederation of the Blind)",
  short_description: "Scholarships for blind students pursuing higher education.",
  full_description: "AICB provides scholarships to blind students for pursuing higher education in India.",
  eligibility: [
    "Blind students enrolled in recognized institutions"
  ],
  benefits: [
    "Annual scholarship amount"
  ],
  documents_required: [
    "Proof of blindness",
    "Admission proof"
  ],
  application_process: [
    "Apply through AICB website or office"
  ],
  official_link: "https://aicb.org.in/",
  disability_type: 1
},
{
  name: "Pre-matric Scholarship for Students with Disabilities",
  short_description: "Scholarship for school students with disabilities.",
  full_description: "The scheme provides financial assistance to school students with disabilities to encourage them to pursue education.",
  eligibility: [
    "Students with 40% or more disability",
    "Studying in class IX or X"
  ],
  benefits: [
    "Monthly scholarship",
    "Book and transport allowance"
  ],
  documents_required: [
    "Disability certificate",
    "School certificate"
  ],
  application_process: [
    "Apply online on National Scholarship Portal"
  ],
  official_link: "https://scholarships.gov.in/",
  disability_type: 1
},
{
  name: "Post-matric Scholarship for Students with Disabilities",
  short_description: "Scholarship for higher education for students with disabilities.",
  full_description: "The scheme provides financial assistance to students with disabilities for pursuing post-matric and higher education.",
  eligibility: [
    "Students with 40% or more disability",
    "Passed previous qualifying examination"
  ],
  benefits: [
    "Monthly scholarship",
    "Book and transport allowance"
  ],
  documents_required: [
    "Disability certificate",
    "Marksheet of previous exam"
  ],
  application_process: [
    "Apply online on National Scholarship Portal"
  ],
  official_link: "https://scholarships.gov.in/",
  disability_type: 1
},
{
  name: "Free Coaching for Students with Disabilities",
  short_description: "Free coaching for competitive exams for students with disabilities.",
  full_description: "The scheme provides free coaching to students with disabilities for various competitive exams.",
  eligibility: [
    "Students with 40% or more disability",
    "Preparing for competitive exams"
  ],
  benefits: [
    "Free coaching classes",
    "Stipend for students"
  ],
  documents_required: [
    "Disability certificate",
    "Proof of exam application"
  ],
  application_process: [
    "Apply through empanelled coaching institutes"
  ],
  official_link: "https://disabilityaffairs.gov.in/",
  disability_type: 1
},
{
  name: "Skill Training for Persons with Visual Impairment",
  short_description: "Skill development and vocational training for visually impaired persons.",
  full_description: "The scheme provides skill development and vocational training to visually impaired persons to enhance their employability.",
  eligibility: [
    "Visually impaired persons aged 18-35"
  ],
  benefits: [
    "Free training",
    "Placement assistance"
  ],
  documents_required: [
    "Disability certificate",
    "Age proof"
  ],
  application_process: [
    "Apply through National Institute for the Visually Handicapped"
  ],
  official_link: "https://nivh.gov.in/",
  disability_type: 1
},
{
  name: "Railway Concession for Blind Persons",
  short_description: "Travel concession for blind persons on Indian Railways.",
  full_description: "Indian Railways provides travel concessions to blind persons and their escorts for travel in various classes.",
  eligibility: [
    "Blind persons with valid certificate"
  ],
  benefits: [
    "Concession in train fare for self and escort"
  ],
  documents_required: [
    "Blindness certificate"
  ],
  application_process: [
    "Apply at railway reservation counter with certificate"
  ],
  official_link: "https://indianrailways.gov.in/",
  disability_type: 1
},
{
  name: "Loan Scheme for Visually Impaired Entrepreneurs",
  short_description: "Loans for visually impaired persons to start businesses.",
  full_description: "The National Handicapped Finance and Development Corporation provides loans to visually impaired persons to start or expand businesses.",
  eligibility: [
    "Visually impaired persons aged 18-55",
    "Viable business plan"
  ],
  benefits: [
    "Low-interest loans",
    "Repayment in easy installments"
  ],
  documents_required: [
    "Disability certificate",
    "Business plan"
  ],
  application_process: [
    "Apply through NHFDC website or office"
  ],
  official_link: "https://nhfdc.nic.in/",
  disability_type: 1
},
// ... (repeat similar structure for disability_type 2, 3, 4 with real schemes)
{
  name: "Assistance to Hearing Handicapped for Purchase/Fitting of Aids and Appliances",
  short_description: "Financial assistance for hearing aids and appliances.",
  full_description: "The ADIP scheme provides financial assistance for the purchase and fitting of hearing aids and appliances for persons with hearing impairment.",
  eligibility: [
    "Indian citizen with 40% or more hearing impairment",
    "Monthly income not exceeding Rs. 22,500/-",
    "Not received assistance during the last 3 years for the same purpose"
  ],
  benefits: [
    "Financial assistance for hearing aids and appliances",
    "100% assistance for income below Rs. 15,000/-",
    "50% assistance for income between Rs. 15,000/- and Rs. 22,500/-"
  ],
  documents_required: [
    "Disability certificate",
    "Income certificate",
    "Aadhar card",
    "Bank account details"
  ],
  application_process: [
    "Contact nearest ALIMCO office or authorized agency",
    "Submit application with required documents",
    "Assessment by medical board",
    "Receive approval and aids/appliances"
  ],
  official_link: "https://disabilityaffairs.gov.in/",
  disability_type: 2
},
{
  name: "Indian Sign Language Research and Training Centre (ISLRTC)",
  short_description: "Promotion and training in Indian Sign Language.",
  full_description: "ISLRTC is dedicated to the development, promotion, and training of Indian Sign Language for the hearing impaired community.",
  eligibility: [
    "Persons with hearing impairment",
    "Interested in learning or teaching Indian Sign Language"
  ],
  benefits: [
    "Sign language training",
    "Interpreter training",
    "Resource development"
  ],
  documents_required: [
    "Application form"
  ],
  application_process: [
    "Apply through ISLRTC website or contact the centre"
  ],
  official_link: "https://islrtc.nic.in/",
  disability_type: 2
},
{
  name: "Cochlear Implant Scheme",
  short_description: "Financial support for cochlear implant surgeries for children.",
  full_description: "The scheme provides financial support for cochlear implant surgeries for children with hearing impairment under the ADIP scheme.",
  eligibility: [
    "Children below 6 years with severe to profound hearing loss",
    "Family income not exceeding Rs. 6 lakh per annum"
  ],
  benefits: [
    "Full cost of cochlear implant surgery",
    "Post-surgery rehabilitation"
  ],
  documents_required: [
    "Disability certificate",
    "Income certificate",
    "Medical records"
  ],
  application_process: [
    "Apply through empanelled hospitals or ALIMCO"
  ],
  official_link: "https://disabilityaffairs.gov.in/",
  disability_type: 2
},
{
  name: "Scholarship for Students with Hearing Impairment",
  short_description: "Scholarships for students with hearing disabilities.",
  full_description: "Scholarships are provided to students with hearing impairment for pursuing school and higher education.",
  eligibility: [
    "Students with 40% or more hearing impairment",
    "Enrolled in recognized school or college"
  ],
  benefits: [
    "Monthly scholarship",
    "Book and transport allowance"
  ],
  documents_required: [
    "Disability certificate",
    "School/college certificate"
  ],
  application_process: [
    "Apply online on National Scholarship Portal"
  ],
  official_link: "https://scholarships.gov.in/",
  disability_type: 2
},
{
  name: "Scheme for Implementation of Persons with Disabilities Act (SIPDA)",
  short_description: "Funding for accessible infrastructure and services.",
  full_description: "SIPDA provides funding for the creation of accessible infrastructure and services for persons with disabilities, including those with hearing impairment.",
  eligibility: [
    "All persons with disabilities in India"
  ],
  benefits: [
    "Accessible public infrastructure",
    "Accessible information and communication services"
  ],
  documents_required: [
    "No documents required for beneficiaries"
  ],
  application_process: [
    "No direct application; implemented by government agencies"
  ],
  official_link: "https://disabilityaffairs.gov.in/content/page/sipda.php",
  disability_type: 2
},
{
  name: "Skill Training for Persons with Hearing Impairment",
  short_description: "Skill development and vocational training for hearing impaired persons.",
  full_description: "The scheme provides skill development and vocational training to persons with hearing impairment to enhance their employability.",
  eligibility: [
    "Persons with hearing impairment aged 18-35"
  ],
  benefits: [
    "Free training",
    "Placement assistance"
  ],
  documents_required: [
    "Disability certificate",
    "Age proof"
  ],
  application_process: [
    "Apply through National Institute for the Empowerment of Persons with Intellectual Disabilities (NIEPID)"
  ],
  official_link: "https://niepid.nic.in/",
  disability_type: 2
},
{
  name: "Railway Concession for Hearing Impaired Persons",
  short_description: "Travel concession for hearing impaired persons on Indian Railways.",
  full_description: "Indian Railways provides travel concessions to hearing impaired persons and their escorts for travel in various classes.",
  eligibility: [
    "Hearing impaired persons with valid certificate"
  ],
  benefits: [
    "Concession in train fare for self and escort"
  ],
  documents_required: [
    "Hearing impairment certificate"
  ],
  application_process: [
    "Apply at railway reservation counter with certificate"
  ],
  official_link: "https://indianrailways.gov.in/",
  disability_type: 2
},
{
  name: "Loan Scheme for Hearing Impaired Entrepreneurs",
  short_description: "Loans for hearing impaired persons to start businesses.",
  full_description: "The National Handicapped Finance and Development Corporation provides loans to hearing impaired persons to start or expand businesses.",
  eligibility: [
    "Hearing impaired persons aged 18-55",
    "Viable business plan"
  ],
  benefits: [
    "Low-interest loans",
    "Repayment in easy installments"
  ],
  documents_required: [
    "Disability certificate",
    "Business plan"
  ],
  application_process: [
    "Apply through NHFDC website or office"
  ],
  official_link: "https://nhfdc.nic.in/",
  disability_type: 2
},
{
  name: "Pre-matric Scholarship for Students with Hearing Impairment",
  short_description: "Scholarship for school students with hearing impairment.",
  full_description: "The scheme provides financial assistance to school students with hearing impairment to encourage them to pursue education.",
  eligibility: [
    "Students with 40% or more hearing impairment",
    "Studying in class IX or X"
  ],
  benefits: [
    "Monthly scholarship",
    "Book and transport allowance"
  ],
  documents_required: [
    "Disability certificate",
    "School certificate"
  ],
  application_process: [
    "Apply online on National Scholarship Portal"
  ],
  official_link: "https://scholarships.gov.in/",
  disability_type: 2
},
{
  name: "Post-matric Scholarship for Students with Hearing Impairment",
  short_description: "Scholarship for higher education for students with hearing impairment.",
  full_description: "The scheme provides financial assistance to students with hearing impairment for pursuing post-matric and higher education.",
  eligibility: [
    "Students with 40% or more hearing impairment",
    "Passed previous qualifying examination"
  ],
  benefits: [
    "Monthly scholarship",
    "Book and transport allowance"
  ],
  documents_required: [
    "Disability certificate",
    "Marksheet of previous exam"
  ],
  application_process: [
    "Apply online on National Scholarship Portal"
  ],
  official_link: "https://scholarships.gov.in/",
  disability_type: 2
},
{
  name: "Free Coaching for Students with Hearing Impairment",
  short_description: "Free coaching for competitive exams for students with hearing impairment.",
  full_description: "The scheme provides free coaching to students with hearing impairment for various competitive exams.",
  eligibility: [
    "Students with 40% or more hearing impairment",
    "Preparing for competitive exams"
  ],
  benefits: [
    "Free coaching classes",
    "Stipend for students"
  ],
  documents_required: [
    "Disability certificate",
    "Proof of exam application"
  ],
  application_process: [
    "Apply through empanelled coaching institutes"
  ],
  official_link: "https://disabilityaffairs.gov.in/",
  disability_type: 2
},
{
  name: "Skill Training for Hearing Impaired Women",
  short_description: "Skill development and vocational training for hearing impaired women.",
  full_description: "The scheme provides skill development and vocational training to hearing impaired women to enhance their employability and independence.",
  eligibility: [
    "Hearing impaired women aged 18-35"
  ],
  benefits: [
    "Free training",
    "Placement assistance"
  ],
  documents_required: [
    "Disability certificate",
    "Age proof"
  ],
  application_process: [
    "Apply through National Institute for Empowerment of Persons with Multiple Disabilities (NIEPMD)"
  ],
  official_link: "https://niepmd.tn.nic.in/",
  disability_type: 2
},
{
  name: "Disability Pension Scheme for Hearing Impaired",
  short_description: "Monthly pension for persons with hearing impairment.",
  full_description: "State governments provide monthly pension to persons with hearing impairment under various disability pension schemes.",
  eligibility: [
    "Persons with 40% or more hearing impairment",
    "Resident of the respective state"
  ],
  benefits: [
    "Monthly pension amount"
  ],
  documents_required: [
    "Disability certificate",
    "Residence proof"
  ],
  application_process: [
    "Apply through state social welfare department"
  ],
  official_link: "https://disabilityaffairs.gov.in/",
  disability_type: 2
},
{
  name: "Deendayal Disabled Rehabilitation Scheme (DDRS)",
  short_description: "Support to NGOs for rehabilitation of persons with intellectual disabilities.",
  full_description: "DDRS provides financial assistance to NGOs for projects related to education, vocational training, and rehabilitation of persons with intellectual disabilities.",
  eligibility: [
    "Registered NGOs working in the field of disability",
    "Minimum 3 years of experience",
    "Proper infrastructure and trained staff"
  ],
  benefits: [
    "Financial assistance for running rehabilitation centers",
    "Support for vocational training",
    "Awareness generation programs"
  ],
  documents_required: [
    "Registration certificate",
    "Audited accounts",
    "Project proposal",
    "Staff details"
  ],
  application_process: [
    "Submit proposal to Ministry of Social Justice and Empowerment",
    "Undergo inspection by committee",
    "Receive approval and funding"
  ],
  official_link: "https://disabilityaffairs.gov.in/content/page/ddrs.php",
  disability_type: 3
},
{
  name: "Niramaya Health Insurance Scheme",
  short_description: "Health insurance for persons with intellectual and developmental disabilities.",
  full_description: "Niramaya provides affordable health insurance to persons with intellectual and developmental disabilities, covering a wide range of medical expenses.",
  eligibility: [
    "Persons with intellectual or developmental disabilities registered with the National Trust"
  ],
  benefits: [
    "Health insurance up to Rs. 1 lakh per annum",
    "Covers OPD, hospitalization, therapies, and corrective surgeries"
  ],
  documents_required: [
    "Disability certificate",
    "Proof of registration with National Trust"
  ],
  application_process: [
    "Apply online through National Trust website or through registered organizations"
  ],
  official_link: "https://thenationaltrust.gov.in/",
  disability_type: 3
},
{
  name: "Gharaunda Scheme",
  short_description: "Group home for adults with intellectual disabilities.",
  full_description: "Gharaunda provides assured lifelong shelter and care for persons with intellectual disabilities in group homes.",
  eligibility: [
    "Persons with intellectual disabilities registered with the National Trust"
  ],
  benefits: [
    "Lifelong group home facility",
    "Caregiver support"
  ],
  documents_required: [
    "Disability certificate",
    "Proof of registration with National Trust"
  ],
  application_process: [
    "Apply through National Trust registered organizations"
  ],
  official_link: "https://thenationaltrust.gov.in/content/scheme/gharaunda.php",
  disability_type: 3
},
{
  name: "Samarth Scheme",
  short_description: "Respite care for persons with intellectual and developmental disabilities.",
  full_description: "Samarth provides respite care homes for persons with intellectual and developmental disabilities who need long-term or temporary care.",
  eligibility: [
    "Persons with intellectual or developmental disabilities registered with the National Trust"
  ],
  benefits: [
    "Respite care home facility",
    "Caregiver support"
  ],
  documents_required: [
    "Disability certificate",
    "Proof of registration with National Trust"
  ],
  application_process: [
    "Apply through National Trust registered organizations"
  ],
  official_link: "https://thenationaltrust.gov.in/content/scheme/samarth.php",
  disability_type: 3
},
{
  name: "Vikaas Day Care Scheme",
  short_description: "Day care for persons with intellectual and developmental disabilities.",
  full_description: "Vikaas provides day care facilities for persons with intellectual and developmental disabilities to enhance interpersonal and vocational skills.",
  eligibility: [
    "Persons with intellectual or developmental disabilities registered with the National Trust"
  ],
  benefits: [
    "Day care facility",
    "Skill development and training"
  ],
  documents_required: [
    "Disability certificate",
    "Proof of registration with National Trust"
  ],
  application_process: [
    "Apply through National Trust registered organizations"
  ],
  official_link: "https://thenationaltrust.gov.in/content/scheme/vikaas.php",
  disability_type: 3
},
{
  name: "Disha Early Intervention and School Readiness Scheme",
  short_description: "Early intervention and school readiness for children with intellectual disabilities.",
  full_description: "Disha provides early intervention and school readiness for children with intellectual and developmental disabilities aged 0-10 years.",
  eligibility: [
    "Children aged 0-10 years with intellectual or developmental disabilities"
  ],
  benefits: [
    "Early intervention services",
    "School readiness programs"
  ],
  documents_required: [
    "Disability certificate",
    "Birth certificate"
  ],
  application_process: [
    "Apply through National Trust registered organizations"
  ],
  official_link: "https://thenationaltrust.gov.in/content/scheme/disha.php",
  disability_type: 3
},
{
  name: "Prerna Marketing Assistance Scheme",
  short_description: "Marketing assistance for products made by persons with intellectual disabilities.",
  full_description: "Prerna provides marketing assistance to organizations promoting products made by persons with intellectual and developmental disabilities.",
  eligibility: [
    "Organizations registered with National Trust"
  ],
  benefits: [
    "Financial assistance for marketing activities",
    "Support for participation in exhibitions and fairs"
  ],
  documents_required: [
    "Registration certificate",
    "Project proposal"
  ],
  application_process: [
    "Apply through National Trust website"
  ],
  official_link: "https://thenationaltrust.gov.in/content/scheme/prerna.php",
  disability_type: 3
},
{
  name: "Sahyogi Caregiver Training Scheme",
  short_description: "Training for caregivers of persons with intellectual disabilities.",
  full_description: "Sahyogi provides training to caregivers of persons with intellectual and developmental disabilities to improve quality of care.",
  eligibility: [
    "Caregivers of persons with intellectual or developmental disabilities"
  ],
  benefits: [
    "Caregiver training programs",
    "Certification"
  ],
  documents_required: [
    "Application form"
  ],
  application_process: [
    "Apply through National Trust registered organizations"
  ],
  official_link: "https://thenationaltrust.gov.in/content/scheme/sahyogi.php",
  disability_type: 3
},
{
  name: "Gyan Prabha Educational Support Scheme",
  short_description: "Educational support for persons with intellectual disabilities.",
  full_description: "Gyan Prabha provides financial support for education and skill development of persons with intellectual and developmental disabilities.",
  eligibility: [
    "Persons with intellectual or developmental disabilities registered with the National Trust"
  ],
  benefits: [
    "Financial support for education and skill development"
  ],
  documents_required: [
    "Disability certificate",
    "Proof of registration with National Trust"
  ],
  application_process: [
    "Apply through National Trust registered organizations"
  ],
  official_link: "https://thenationaltrust.gov.in/content/scheme/gyanprabha.php",
  disability_type: 3
},
{
  name: "Arunim Livelihood Scheme",
  short_description: "Livelihood promotion for persons with intellectual disabilities.",
  full_description: "Arunim promotes livelihood opportunities for persons with intellectual and developmental disabilities through self-employment and entrepreneurship.",
  eligibility: [
    "Persons with intellectual or developmental disabilities registered with the National Trust"
  ],
  benefits: [
    "Support for self-employment and entrepreneurship",
    "Market linkages"
  ],
  documents_required: [
    "Disability certificate",
    "Proof of registration with National Trust"
  ],
  application_process: [
    "Apply through National Trust registered organizations"
  ],
  official_link: "https://thenationaltrust.gov.in/content/scheme/arunim.php",
  disability_type: 3
},
{
  name: "Niramaya Health Insurance Renewal Scheme",
  short_description: "Renewal of health insurance for persons with intellectual disabilities.",
  full_description: "This scheme provides for the renewal of health insurance under the Niramaya scheme for persons with intellectual and developmental disabilities.",
  eligibility: [
    "Persons with intellectual or developmental disabilities already enrolled in Niramaya"
  ],
  benefits: [
    "Continued health insurance coverage"
  ],
  documents_required: [
    "Niramaya health card",
    "Disability certificate"
  ],
  application_process: [
    "Apply through National Trust registered organizations"
  ],
  official_link: "https://thenationaltrust.gov.in/content/scheme/niramaya.php",
  disability_type: 3
},
{
  name: "Disability Pension Scheme for Intellectual Disabilities",
  short_description: "Monthly pension for persons with intellectual disabilities.",
  full_description: "State governments provide monthly pension to persons with intellectual disabilities under various disability pension schemes.",
  eligibility: [
    "Persons with 40% or more intellectual disability",
    "Resident of the respective state"
  ],
  benefits: [
    "Monthly pension amount"
  ],
  documents_required: [
    "Disability certificate",
    "Residence proof"
  ],
  application_process: [
    "Apply through state social welfare department"
  ],
  official_link: "https://disabilityaffairs.gov.in/",
  disability_type: 3
},
{
  name: "Scholarship for Students with Intellectual Disabilities",
  short_description: "Scholarships for students with intellectual disabilities.",
  full_description: "Scholarships are provided to students with intellectual disabilities for pursuing school and higher education.",
  eligibility: [
    "Students with 40% or more intellectual disability",
    "Enrolled in recognized school or college"
  ],
  benefits: [
    "Monthly scholarship",
    "Book and transport allowance"
  ],
  documents_required: [
    "Disability certificate",
    "School/college certificate"
  ],
  application_process: [
    "Apply online on National Scholarship Portal"
  ],
  official_link: "https://scholarships.gov.in/",
  disability_type: 3
},
{
  name: "Free Coaching for Students with Intellectual Disabilities",
  short_description: "Free coaching for competitive exams for students with intellectual disabilities.",
  full_description: "The scheme provides free coaching to students with intellectual disabilities for various competitive exams.",
  eligibility: [
    "Students with 40% or more intellectual disability",
    "Preparing for competitive exams"
  ],
  benefits: [
    "Free coaching classes",
    "Stipend for students"
  ],
  documents_required: [
    "Disability certificate",
    "Proof of exam application"
  ],
  application_process: [
    "Apply through empanelled coaching institutes"
  ],
  official_link: "https://disabilityaffairs.gov.in/",
  disability_type: 3
},
{
  name: "Unique Disability ID (UDID) Project",
  short_description: "Single ID for all government benefits and schemes.",
  full_description: "The UDID project aims to create a national database for persons with disabilities and issue a unique disability identity card to enable them to avail benefits of various government schemes.",
  eligibility: [
    "Persons with 40% or more physical disability"
  ],
  benefits: [
    "Single ID for all government schemes",
    "Easy access to benefits"
  ],
  documents_required: [
    "Disability certificate",
    "Aadhar card"
  ],
  application_process: [
    "Apply online at Swavlamban Card portal"
  ],
  official_link: "https://www.swavlambancard.gov.in/",
  disability_type: 4
},
{
  name: "ADIP Scheme (for Physical Disabilities)",
  short_description: "Financial assistance for purchase/fitting of aids and appliances.",
  full_description: "The ADIP scheme provides financial assistance for the purchase and fitting of aids and appliances for persons with physical disabilities.",
  eligibility: [
    "Indian citizen with 40% or more physical disability",
    "Monthly income not exceeding Rs. 22,500/-",
    "Not received assistance during the last 3 years for the same purpose"
  ],
  benefits: [
    "Financial assistance for aids/appliances",
    "100% assistance for income below Rs. 15,000/-",
    "50% assistance for income between Rs. 15,000/- and Rs. 22,500/-"
  ],
  documents_required: [
    "Disability certificate",
    "Income certificate",
    "Aadhar card",
    "Bank account details"
  ],
  application_process: [
    "Contact nearest ALIMCO office or authorized agency",
    "Submit application with required documents",
    "Assessment by medical board",
    "Receive approval and aids/appliances"
  ],
  official_link: "https://disabilityaffairs.gov.in/",
  disability_type: 4
},
{
  name: "Scheme for Providing Employment to Persons with Disabilities in the Private Sector",
  short_description: "Incentives to private employers for hiring persons with disabilities.",
  full_description: "This scheme provides incentives to private sector employers for employing persons with physical disabilities.",
  eligibility: [
    "Persons with 40% or more physical disability",
    "Employed in private sector"
  ],
  benefits: [
    "Incentives to employers",
    "Job placement support"
  ],
  documents_required: [
    "Disability certificate",
    "Employment proof"
  ],
  application_process: [
    "Employer applies through Ministry of Social Justice and Empowerment"
  ],
  official_link: "https://disabilityaffairs.gov.in/content/page/employment.php",
  disability_type: 4
},
{
  name: "Scholarship for Students with Physical Disabilities",
  short_description: "Scholarships for students with physical disabilities.",
  full_description: "Scholarships are provided to students with physical disabilities for pursuing school and higher education.",
  eligibility: [
    "Students with 40% or more physical disability",
    "Enrolled in recognized school or college"
  ],
  benefits: [
    "Monthly scholarship",
    "Book and transport allowance"
  ],
  documents_required: [
    "Disability certificate",
    "School/college certificate"
  ],
  application_process: [
    "Apply online on National Scholarship Portal"
  ],
  official_link: "https://scholarships.gov.in/",
  disability_type: 4
},
{
  name: "Accessible India Campaign (Sugamya Bharat Abhiyan)",
  short_description: "Making public infrastructure accessible for persons with disabilities.",
  full_description: "A flagship campaign to make government buildings, transport systems, and information accessible to persons with disabilities.",
  eligibility: [
    "All persons with disabilities in India"
  ],
  benefits: [
    "Barrier-free access to public infrastructure",
    "Accessible transport and information systems"
  ],
  documents_required: [
    "No documents required for beneficiaries"
  ],
  application_process: [
    "No direct application; implemented by government agencies"
  ],
  official_link: "https://disabilityaffairs.gov.in/",
  disability_type: 4
},
{
  name: "Skill Training for Persons with Physical Disabilities",
  short_description: "Skill development and vocational training for physically disabled persons.",
  full_description: "The scheme provides skill development and vocational training to persons with physical disabilities to enhance their employability.",
  eligibility: [
    "Persons with physical disabilities aged 18-35"
  ],
  benefits: [
    "Free training",
    "Placement assistance"
  ],
  documents_required: [
    "Disability certificate",
    "Age proof"
  ],
  application_process: [
    "Apply through National Institute for the Empowerment of Persons with Physical Disabilities (NIEPID)"
  ],
  official_link: "https://niepid.nic.in/",
  disability_type: 4
},
{
  name: "Railway Concession for Persons with Physical Disabilities",
  short_description: "Travel concession for persons with physical disabilities on Indian Railways.",
  full_description: "Indian Railways provides travel concessions to persons with physical disabilities and their escorts for travel in various classes.",
  eligibility: [
    "Persons with physical disabilities with valid certificate"
  ],
  benefits: [
    "Concession in train fare for self and escort"
  ],
  documents_required: [
    "Disability certificate"
  ],
  application_process: [
    "Apply at railway reservation counter with certificate"
  ],
  official_link: "https://indianrailways.gov.in/",
  disability_type: 4
},
{
  name: "Loan Scheme for Physically Disabled Entrepreneurs",
  short_description: "Loans for physically disabled persons to start businesses.",
  full_description: "The National Handicapped Finance and Development Corporation provides loans to physically disabled persons to start or expand businesses.",
  eligibility: [
    "Physically disabled persons aged 18-55",
    "Viable business plan"
  ],
  benefits: [
    "Low-interest loans",
    "Repayment in easy installments"
  ],
  documents_required: [
    "Disability certificate",
    "Business plan"
  ],
  application_process: [
    "Apply through NHFDC website or office"
  ],
  official_link: "https://nhfdc.nic.in/",
  disability_type: 4
},
{
  name: "Pre-matric Scholarship for Students with Physical Disabilities",
  short_description: "Scholarship for school students with physical disabilities.",
  full_description: "The scheme provides financial assistance to school students with physical disabilities to encourage them to pursue education.",
  eligibility: [
    "Students with 40% or more physical disability",
    "Studying in class IX or X"
  ],
  benefits: [
    "Monthly scholarship",
    "Book and transport allowance"
  ],
  documents_required: [
    "Disability certificate",
    "School certificate"
  ],
  application_process: [
    "Apply online on National Scholarship Portal"
  ],
  official_link: "https://scholarships.gov.in/",
  disability_type: 4
},
{
  name: "Post-matric Scholarship for Students with Physical Disabilities",
  short_description: "Scholarship for higher education for students with physical disabilities.",
  full_description: "The scheme provides financial assistance to students with physical disabilities for pursuing post-matric and higher education.",
  eligibility: [
    "Students with 40% or more physical disability",
    "Passed previous qualifying examination"
  ],
  benefits: [
    "Monthly scholarship",
    "Book and transport allowance"
  ],
  documents_required: [
    "Disability certificate",
    "Marksheet of previous exam"
  ],
  application_process: [
    "Apply online on National Scholarship Portal"
  ],
  official_link: "https://scholarships.gov.in/",
  disability_type: 4
},
{
  name: "Free Coaching for Students with Physical Disabilities",
  short_description: "Free coaching for competitive exams for students with physical disabilities.",
  full_description: "The scheme provides free coaching to students with physical disabilities for various competitive exams.",
  eligibility: [
    "Students with 40% or more physical disability",
    "Preparing for competitive exams"
  ],
  benefits: [
    "Free coaching classes",
    "Stipend for students"
  ],
  documents_required: [
    "Disability certificate",
    "Proof of exam application"
  ],
  application_process: [
    "Apply through empanelled coaching institutes"
  ],
  official_link: "https://disabilityaffairs.gov.in/",
  disability_type: 4
},
{
  name: "Skill Training for Women with Physical Disabilities",
  short_description: "Skill development and vocational training for women with physical disabilities.",
  full_description: "The scheme provides skill development and vocational training to women with physical disabilities to enhance their employability and independence.",
  eligibility: [
    "Women with physical disabilities aged 18-35"
  ],
  benefits: [
    "Free training",
    "Placement assistance"
  ],
  documents_required: [
    "Disability certificate",
    "Age proof"
  ],
  application_process: [
    "Apply through National Institute for Empowerment of Persons with Multiple Disabilities (NIEPMD)"
  ],
  official_link: "https://niepmd.tn.nic.in/",
  disability_type: 4
},
{
  name: "Disability Pension Scheme for Physical Disabilities",
  short_description: "Monthly pension for persons with physical disabilities.",
  full_description: "State governments provide monthly pension to persons with physical disabilities under various disability pension schemes.",
  eligibility: [
    "Persons with 40% or more physical disability",
    "Resident of the respective state"
  ],
  benefits: [
    "Monthly pension amount"
  ],
  documents_required: [
    "Disability certificate",
    "Residence proof"
  ],
  application_process: [
    "Apply through state social welfare department"
  ],
  official_link: "https://disabilityaffairs.gov.in/",
  disability_type: 4
},
{
  name: "Incentive Scheme for Employers in the Private Sector for Providing Employment to Persons with Disabilities",
  short_description: "Incentives to private employers for hiring persons with disabilities.",
  full_description: "This scheme provides incentives to private sector employers for employing persons with physical disabilities, including reimbursement of EPF and ESI contributions.",
  eligibility: [
    "Persons with 40% or more physical disability",
    "Employed in private sector"
  ],
  benefits: [
    "Reimbursement of EPF and ESI contributions",
    "Job placement support"
  ],
  documents_required: [
    "Disability certificate",
    "Employment proof"
  ],
  application_process: [
    "Employer applies through Ministry of Social Justice and Empowerment"
  ],
  official_link: "https://disabilityaffairs.gov.in/content/page/employment.php",
  disability_type: 4
},
];

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    return Scheme.deleteMany({});
  })
  .then(() => {
    console.log('Cleared existing schemes');
    return Scheme.insertMany(schemes);
  })
  .then(() => {
    console.log('Added real Indian government schemes for all disability types');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.connection.close();
  }); 
},
{
  name: "ADIP Scheme (for Physical Disabilities)",
  short_description: "Financial assistance for purchase/fitting of aids and appliances.",
  full_description: "The ADIP scheme provides financial assistance for the purchase and fitting of aids and appliances for persons with physical disabilities.",
  eligibility: [
    "Indian citizen with 40% or more physical disability",
    "Monthly income not exceeding Rs. 22,500/-",
    "Not received assistance during the last 3 years for the same purpose"
  ],
  benefits: [
    "Financial assistance for aids/appliances",
    "100% assistance for income below Rs. 15,000/-",
    "50% assistance for income between Rs. 15,000/- and Rs. 22,500/-"
  ],
  documents_required: [
    "Disability certificate",
    "Income certificate",
    "Aadhar card",
    "Bank account details"
  ],
  application_process: [
    "Contact nearest ALIMCO office or authorized agency",
    "Submit application with required documents",
    "Assessment by medical board",
    "Receive approval and aids/appliances"
  ],
  official_link: "https://disabilityaffairs.gov.in/",
  disability_type: 4
},
{
  name: "Scheme for Providing Employment to Persons with Disabilities in the Private Sector",
  short_description: "Incentives to private employers for hiring persons with disabilities.",
  full_description: "This scheme provides incentives to private sector employers for employing persons with physical disabilities.",
  eligibility: [
    "Persons with 40% or more physical disability",
    "Employed in private sector"
  ],
  benefits: [
    "Incentives to employers",
    "Job placement support"
  ],
  documents_required: [
    "Disability certificate",
    "Employment proof"
  ],
  application_process: [
    "Employer applies through Ministry of Social Justice and Empowerment"
  ],
  official_link: "https://disabilityaffairs.gov.in/content/page/employment.php",
  disability_type: 4
},
{
  name: "Scholarship for Students with Physical Disabilities",
  short_description: "Scholarships for students with physical disabilities.",
  full_description: "Scholarships are provided to students with physical disabilities for pursuing school and higher education.",
  eligibility: [
    "Students with 40% or more physical disability",
    "Enrolled in recognized school or college"
  ],
  benefits: [
    "Monthly scholarship",
    "Book and transport allowance"
  ],
  documents_required: [
    "Disability certificate",
    "School/college certificate"
  ],
  application_process: [
    "Apply online on National Scholarship Portal"
  ],
  official_link: "https://scholarships.gov.in/",
  disability_type: 4
},
{
  name: "Accessible India Campaign (Sugamya Bharat Abhiyan)",
  short_description: "Making public infrastructure accessible for persons with disabilities.",
  full_description: "A flagship campaign to make government buildings, transport systems, and information accessible to persons with disabilities.",
  eligibility: [
    "All persons with disabilities in India"
  ],
  benefits: [
    "Barrier-free access to public infrastructure",
    "Accessible transport and information systems"
  ],
  documents_required: [
    "No documents required for beneficiaries"
  ],
  application_process: [
    "No direct application; implemented by government agencies"
  ],
  official_link: "https://disabilityaffairs.gov.in/",
  disability_type: 4
},
{
  name: "Skill Training for Persons with Physical Disabilities",
  short_description: "Skill development and vocational training for physically disabled persons.",
  full_description: "The scheme provides skill development and vocational training to persons with physical disabilities to enhance their employability.",
  eligibility: [
    "Persons with physical disabilities aged 18-35"
  ],
  benefits: [
    "Free training",
    "Placement assistance"
  ],
  documents_required: [
    "Disability certificate",
    "Age proof"
  ],
  application_process: [
    "Apply through National Institute for the Empowerment of Persons with Physical Disabilities (NIEPID)"
  ],
  official_link: "https://niepid.nic.in/",
  disability_type: 4
},
{
  name: "Railway Concession for Persons with Physical Disabilities",
  short_description: "Travel concession for persons with physical disabilities on Indian Railways.",
  full_description: "Indian Railways provides travel concessions to persons with physical disabilities and their escorts for travel in various classes.",
  eligibility: [
    "Persons with physical disabilities with valid certificate"
  ],
  benefits: [
    "Concession in train fare for self and escort"
  ],
  documents_required: [
    "Disability certificate"
  ],
  application_process: [
    "Apply at railway reservation counter with certificate"
  ],
  official_link: "https://indianrailways.gov.in/",
  disability_type: 4
},
{
  name: "Loan Scheme for Physically Disabled Entrepreneurs",
  short_description: "Loans for physically disabled persons to start businesses.",
  full_description: "The National Handicapped Finance and Development Corporation provides loans to physically disabled persons to start or expand businesses.",
  eligibility: [
    "Physically disabled persons aged 18-55",
    "Viable business plan"
  ],
  benefits: [
    "Low-interest loans",
    "Repayment in easy installments"
  ],
  documents_required: [
    "Disability certificate",
    "Business plan"
  ],
  application_process: [
    "Apply through NHFDC website or office"
  ],
  official_link: "https://nhfdc.nic.in/",
  disability_type: 4
},
{
  name: "Pre-matric Scholarship for Students with Physical Disabilities",
  short_description: "Scholarship for school students with physical disabilities.",
  full_description: "The scheme provides financial assistance to school students with physical disabilities to encourage them to pursue education.",
  eligibility: [
    "Students with 40% or more physical disability",
    "Studying in class IX or X"
  ],
  benefits: [
    "Monthly scholarship",
    "Book and transport allowance"
  ],
  documents_required: [
    "Disability certificate",
    "School certificate"
  ],
  application_process: [
    "Apply online on National Scholarship Portal"
  ],
  official_link: "https://scholarships.gov.in/",
  disability_type: 4
},
{
  name: "Post-matric Scholarship for Students with Physical Disabilities",
  short_description: "Scholarship for higher education for students with physical disabilities.",
  full_description: "The scheme provides financial assistance to students with physical disabilities for pursuing post-matric and higher education.",
  eligibility: [
    "Students with 40% or more physical disability",
    "Passed previous qualifying examination"
  ],
  benefits: [
    "Monthly scholarship",
    "Book and transport allowance"
  ],
  documents_required: [
    "Disability certificate",
    "Marksheet of previous exam"
  ],
  application_process: [
    "Apply online on National Scholarship Portal"
  ],
  official_link: "https://scholarships.gov.in/",
  disability_type: 4
},
{
  name: "Free Coaching for Students with Physical Disabilities",
  short_description: "Free coaching for competitive exams for students with physical disabilities.",
  full_description: "The scheme provides free coaching to students with physical disabilities for various competitive exams.",
  eligibility: [
    "Students with 40% or more physical disability",
    "Preparing for competitive exams"
  ],
  benefits: [
    "Free coaching classes",
    "Stipend for students"
  ],
  documents_required: [
    "Disability certificate",
    "Proof of exam application"
  ],
  application_process: [
    "Apply through empanelled coaching institutes"
  ],
  official_link: "https://disabilityaffairs.gov.in/",
  disability_type: 4
},
{
  name: "Skill Training for Women with Physical Disabilities",
  short_description: "Skill development and vocational training for women with physical disabilities.",
  full_description: "The scheme provides skill development and vocational training to women with physical disabilities to enhance their employability and independence.",
  eligibility: [
    "Women with physical disabilities aged 18-35"
  ],
  benefits: [
    "Free training",
    "Placement assistance"
  ],
  documents_required: [
    "Disability certificate",
    "Age proof"
  ],
  application_process: [
    "Apply through National Institute for Empowerment of Persons with Multiple Disabilities (NIEPMD)"
  ],
  official_link: "https://niepmd.tn.nic.in/",
  disability_type: 4
},
{
  name: "Disability Pension Scheme for Physical Disabilities",
  short_description: "Monthly pension for persons with physical disabilities.",
  full_description: "State governments provide monthly pension to persons with physical disabilities under various disability pension schemes.",
  eligibility: [
    "Persons with 40% or more physical disability",
    "Resident of the respective state"
  ],
  benefits: [
    "Monthly pension amount"
  ],
  documents_required: [
    "Disability certificate",
    "Residence proof"
  ],
  application_process: [
    "Apply through state social welfare department"
  ],
  official_link: "https://disabilityaffairs.gov.in/",
  disability_type: 4
},
{
  name: "Incentive Scheme for Employers in the Private Sector for Providing Employment to Persons with Disabilities",
  short_description: "Incentives to private employers for hiring persons with disabilities.",
  full_description: "This scheme provides incentives to private sector employers for employing persons with physical disabilities, including reimbursement of EPF and ESI contributions.",
  eligibility: [
    "Persons with 40% or more physical disability",
    "Employed in private sector"
  ],
  benefits: [
    "Reimbursement of EPF and ESI contributions",
    "Job placement support"
  ],
  documents_required: [
    "Disability certificate",
    "Employment proof"
  ],
  application_process: [
    "Employer applies through Ministry of Social Justice and Empowerment"
  ],
  official_link: "https://disabilityaffairs.gov.in/content/page/employment.php",
  disability_type: 4
},
];

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    return Scheme.deleteMany({});
  })
  .then(() => {
    console.log('Cleared existing schemes');
    return Scheme.insertMany(schemes);
  })
  .then(() => {
    console.log('Added real Indian government schemes for all disability types');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.connection.close();
  }); 