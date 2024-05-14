import React from 'react';
import {
  Box,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

function TermsAndConditions() {
  return (
    <Box p="6">
      <Heading as="h1" size="xl" mb="4">
        Terms and Conditions
      </Heading>
      <Text fontSize="lg" mb="4">
        Please read these terms and conditions carefully before using our
        platform.        
      </Text>
      <Text>
      
      </Text>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
            User Accounts
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
          To create an account on our platform, users must be at least 18 years old or have parental consent. 
          During registration, users are required to provide a valid email address, username, and password.
          It is the user's responsibility to safeguard their account credentials and refrain from sharing them with others.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
            Content Guidelines
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
          We encourage users to share their depression journeys, experiences, and resources in a supportive and respectful manner. 
          However, content that promotes self-harm, violence, hate speech, discrimination, or illegal activities is strictly prohibited. 
          Users are expected to adhere to community guidelines and report any inappropriate content.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Privacy Policy
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
          We are committed to protecting user privacy and confidentiality. 
          Our privacy policy outlines how we collect, use, and protect personal information provided by users. 
          This includes details on data encryption, storage practices, and user control over their information. 
          Users have the right to review, update, or delete their data as per applicable laws.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
            Security Measures
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
          Our platform employs robust security measures to safeguard user data and ensure a safe online environment. 
          This includes encryption of sensitive information, secure communication protocols (HTTPS), and regular security audits. 
          Users are encouraged to enable two-factor authentication for added security.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
            Consultant Services
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
          Users can access consultant services provided by licensed mental health professionals on our platform. 
          By scheduling appointments, users agree to maintain confidentiality and respect the professional boundaries of the consulting relationship. 
          Consultants adhere to ethical standards and maintain client confidentiality as per professional guidelines.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
            Marketplace
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
          Our marketplace allows users to buy and sell goods or services related to mental health and well-being. 
          Products or services promoting unproven treatments, illegal substances, or harmful practices are not permitted. 
          Users must comply with applicable laws and regulations when conducting transactions on the platform.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
            Job Opportunities
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
          Consultants registered on our platform may have access to job opportunities, including freelance projects, part-time positions, or full-time employment. 
          Job listings are subject to review and approval by platform administrators. 
          Consultants are responsible for maintaining professional conduct and fulfilling contractual obligations.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
            Community Guidelines
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
          Our community guidelines promote positive interactions and mutual support among users. 
          We encourage empathy, understanding, and constructive communication. 
          Violations of community guidelines may result in content removal, account suspension, or other disciplinary actions.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
            Dispute Resolution
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
          In the event of disputes between users or with consultants, we offer mediation services to facilitate resolution. 
          If mediation is unsuccessful, disputes may be escalated to binding arbitration or legal proceedings, as outlined in our dispute resolution policy.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
            Updates and Amendments
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
          These terms and conditions may be updated or amended periodically to reflect changes in our platform or legal requirements. 
          Users will be notified of any updates via email or platform notifications.
           Continued use of the platform constitutes acceptance of the revised terms.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
            Contact Information
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
          For questions, concerns, or feedback regarding our platform or the terms and conditions, users can contact our support team at support@example.com. 
          We are committed to providing assistance and addressing user inquiries promptly.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

export default TermsAndConditions;
