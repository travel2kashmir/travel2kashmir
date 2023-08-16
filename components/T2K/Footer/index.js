import React, { useState } from 'react';
import Modal from '../Modals/Modal';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import ContactUsModal from '../Modals/ContactUsModal';
import Link from 'next/link';
import Router from 'next/router';


function Footer() {

    const [showModalTC, setShowModalTC] = useState(0);
    const [showModalPrivacy, setShowModalPrivacy] = useState(0);
    const [showModalContactUs, setShowModalContactUs] = useState(0);

    return (
        <section className=' bottom-0'>
            <div className='bg-slate-900 text-white'>

                <div className='pb-14'>
                    <div className='px-3'>
                        <div>
                            <div className='pt-10 px-3'>
                                <a className='flex h-10 mb-6'><h2 className='flex items-center text-xl'>Travel2Kashmir</h2></a>
                                <p className='mb-6 text-sm text-slate-200'>Experience the captivating allure of Kashmir through Travel2Kashmir, an innovative startup that is revitalizing the local tourism sector with immersive adventures and sustainable travel approaches. Embrace the genuine local hospitality and uncover the undiscovered treasures of this awe-inspiring location alongside us.</p>
                                <ul className='text-white flex gap-5'>
                                    <li><Link href="https://www.facebook.com/travel2kashmir/"><FacebookIcon /></Link></li>
                                    {/* <li><TwitterIcon /></li> */}
                                    {/* <li><LinkedInIcon /></li> */}
                                    {/* <li><Link href="https://instagram.com/travel2kashmirr?igshid=MzNlNGNkZWQ4Mg=="><InstagramIcon /></Link></li> */}

                                </ul>
                            </div>

                            <div className='md:flex md:gap-5 lg:gap-16'>
                                <div className='pt-12 px-3 flex items-center justify-center'>
                                    <img src='/t2k.png' className='md:h-28'/>
                                </div>
                                <div className='pt-12 px-3'>
                                    <h2 className='pb-3 text-xl font-bold'>Contact</h2>
                                    <ul className='text-sm'>
                                        <li className='pb-5'>
                                            <div className='flex gap-3'>
                                                <LocalPhoneIcon />
                                                <p>+91-9632911213</p>
                                            </div>
                                        </li>
                                        <li className='pb-5'>
                                            <div className='flex gap-3'>
                                                <EmailIcon />
                                                <p>chairman@travel2kashmir.com</p>
                                            </div>
                                        </li>
                                        <li className='pb-5'>
                                            <div className='flex gap-3'>
                                                <LocationOnIcon />
                                                <p>Shalateng Srinagar, J&K</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className='pt-12 px-3'>
                                    <h2 className='pb-3 text-xl font-bold'>Learn More</h2>
                                    <ul className='text-sm'>
                                        <li className='pb-5'>
                                            <div className='flex gap-3'>
                                                <ContactMailOutlinedIcon />
                                                <a className='cursor-pointer' onClick={() => setShowModalContactUs(1)}><p>Contact Us</p></a>
                                            </div>
                                        </li>
                                        <li className='pb-5'>
                                            <div className='flex gap-3'>
                                                <PolicyOutlinedIcon />
                                                <p className='cursor-pointer' onClick={() => setShowModalPrivacy(1)}>Privacy Policy</p>
                                            </div>
                                        </li>
                                        <li className='pb-5'>
                                            <div className='flex gap-3'>
                                                <GavelOutlinedIcon />
                                                <p className='cursor-pointer' onClick={() => setShowModalTC(1)}>Terms & Conditions</p>
                                            </div>
                                        </li>
                                        <li className='pb-5'>
                                            <div className='flex gap-3'>
                                                <ExitToAppOutlinedIcon />
                                                <Link href="https://hangul-release.vercel.app/">
                                                    <p className='cursor-pointer'>Sign In</p>
                                                </Link>

                                            </div>
                                        </li>
                                    </ul>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='px-3'>
                    <div className='px-3'>
                        <div className=' py-3 border-t-2'>
                            <div>
                                <div className='my-6 px-3 text-center'>
                                    <p >Copyright &copy; {new Date().getFullYear()} Travel2Kashmir</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            {/* ------------------- modal view for footer-------------------------- */}

            <div className={showModalContactUs === 1 ? "block" : "hidden"}>
                <ContactUsModal
                    setShowModalContactUs={setShowModalContactUs}
                />
            </div>

            <div className={showModalTC === 1 ? "block" : "hidden"}>
                <Modal
                    title={`Terms & Conditions`}
                    description={`Terms and Conditions for Travel2Kashmir

                    Effective Date: 01 Aug 2023
                    
                    Please read these Terms and Conditions ("Terms") carefully before using the services provided by Travel2Kashmir ("we," "us," "our"). By accessing or using our website, mobile application, or any other platform provided by Travel2Kashmir (collectively referred to as the "Services"), you agree to be bound by these Terms. If you do not agree with these Terms, please do not use our Services.
                    
                    1. Modification and Withdrawal of Offers or Services:
                    We reserve the right to modify, suspend, or withdraw any offer, service, or feature without prior notice. We are not liable to you or any third party for any changes or discontinuations.
                    
                    2. Changes to Payment Plans and Free Tier Usage:
                    We reserve the right to change the payment plans, pricing, and usage limits of our services, including any free tiers, at our sole discretion. We will notify you of such changes through email or prominent notices on our website.
                    
                    3. Data Management and Storage:
                    We have the right to manage and store your data on servers that we deem appropriate, including those located in different jurisdictions. By using our Services, you consent to the storage and processing of your data as outlined in our Privacy Policy.
                    
                    4. Advanced Payments:
                    Any service provided by Travel2Kashmir will be subject to advanced payments. We will not initiate or fulfill any booking, reservation, or service until the required payment has been received and confirmed.
                    
                    5. User Responsibilities:
                    You agree to use our Services for lawful purposes only and to comply with all applicable laws and regulations. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                    
                    6. Intellectual Property:
                    All content and materials provided through our Services, including text, graphics, logos, icons, images, audio clips, and software, are the property of Travel2Kashmir or its licensors and are protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works based on our content without our prior written consent.
                    
                    7. Limitation of Liability:
                    To the extent permitted by law, Travel2Kashmir shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or related to your use of our Services.
                    
                    8. Indemnification:
                    You agree to indemnify, defend, and hold Travel2Kashmir harmless from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorney's fees) arising out of or related to your use of our Services, your violation of these Terms, or your infringement of any rights of a third party.
                    
                    9. Governing Law:
                    These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
                    
                    10. Contact Us:
                    If you have any questions, concerns, or requests regarding these Terms, please contact us at chairman@travel2kashmir.com
                    
                    By using our Services, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
                    
                    Travel2kashmir
                    shalteng, Srinagar
                    chairman@travel2kashmir.com
                    `}
                    setShowModal={(e) => setShowModalTC(e)}
                />
            </div>

            <div className={showModalPrivacy === 1 ? "block" : "hidden"}>
                <Modal
                    title={`Privacy Policy`}
                    description={`Privacy Policy for Travel2Kashmir

                    Effective Date: 1st Aug 2023
                    
                    At Travel2Kashmir ("we," "us," "our"), we are committed to maintaining the privacy and security of your personal information. This Privacy Policy outlines our practices regarding the collection, use, and protection of your data when you use our services. By accessing or using our website, mobile application, or any other platform provided by Travel2Kashmir (collectively referred to as the "Services"), you consent to the terms outlined in this Privacy Policy.
                    
                    1. Information We Collect:
                    We may collect and store certain information from you when you use our Services, including:
                    - Personal information such as your name, contact details, and billing information.
                    - Travel-related information, such as your travel itinerary and preferences.
                    - Log and usage data, including IP addresses, browser type, device information, and interaction with our Services.
                    - Other information you choose to provide, such as feedback, reviews, and communication preferences.
                    
                    2. How We Use Your Information:
                    We will use the information we collect for the following purposes:
                    - To provide and improve our Services, including customization and personalization.
                    - For research and development purposes to enhance our offerings and user experience.
                    - To communicate with you regarding your bookings, inquiries, and updates about our Services.
                    - To facilitate payment processing and billing.
                    - To comply with legal obligations and enforce our terms of use.
                    
                    3. Data Sharing:
                    We will not share your personal information with third parties except in the following circumstances:
                    - With subsidiaries or affiliated companies of Travel2Kashmir for the purposes outlined in this Privacy Policy.
                    - With service providers who assist us in providing the Services, subject to confidentiality agreements.
                    - When required by law, regulation, or legal process.
                    - In connection with the sale, merger, or acquisition of all or part of our business.
                    
                    4. Data Storage and Security:
                    Your data will be stored on servers located within India, and we will abide by Indian IT rules and regulations. We employ technical and organizational measures to safeguard your information, but please note that no method of transmission or storage is 100% secure. We cannot guarantee the absolute security of your data.
                    
                    5. Your Choices and Rights:
                    You have the right to access, correct, update, and delete your personal information. You can manage your communication preferences and opt-out of marketing communications at any time. To exercise your rights, please contact us at [insert contact email].
                    
                    6. Children's Privacy:
                    Our Services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children. If you believe that we have inadvertently collected information from a child, please contact us to have the data removed.
                    
                    7. Updates to this Privacy Policy:
                    We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes via email or through prominent notices on our website.
                    
                    8. Contact Us:
                    If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information.
                    
                    By using our Services, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and sharing of your information as described herein.
                    
                    Travel2kashmir
                    Shalteng,Srinagar
                    chairman@travel2kashmir.com
                    `}
                    setShowModal={(e) => setShowModalPrivacy(e)}
                />
            </div>

        </section>
    )
}

export default Footer;