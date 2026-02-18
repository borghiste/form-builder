
import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Tabs, 
  Tab, 
  Paper, 
  Divider, 
  List, 
  ListItem, 
  ListItemText, 
  Link 
} from '@mui/material';

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function TermsAndPrivacy() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Paper 
          elevation={3}
          sx={{ backgroundColor: 'background.paper' }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              centered
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Terms of Service" />
              <Tab label="Privacy Policy" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Typography variant="h4" gutterBottom color="text.primary">
              Terms of Service
            </Typography>
            <Typography variant="caption" color="text.secondary" gutterBottom display="block">
              Last updated: January 19, 2026
            </Typography>
            
            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              1. Acceptance of Terms
            </Typography>
            <Typography paragraph color="text.secondary">
              By accessing and using this Form Builder service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              2. Description of Service
            </Typography>
            <Typography paragraph color="text.secondary">
              Our Form Builder provides tools to create, customize, and deploy online forms for data collection purposes. The service includes form design tools, data storage, and analytics features.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              3. User Obligations
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Account Security"
                  secondary="You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
                  primaryTypographyProps={{ color: 'text.primary' }}
                  secondaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Lawful Use"
                  secondary="You agree to use the service only for lawful purposes and in accordance with these Terms. You shall not use the service to collect sensitive information without proper consent."
                  primaryTypographyProps={{ color: 'text.primary' }}
                  secondaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Content Responsibility"
                  secondary="You are solely responsible for the content of forms you create and the data you collect through our service."
                  primaryTypographyProps={{ color: 'text.primary' }}
                  secondaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
            </List>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              4. Prohibited Uses
            </Typography>
            <Typography paragraph color="text.secondary">
              You may not use our service to:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="• Collect personal data without proper consent or legal basis"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Engage in fraudulent or deceptive practices"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Distribute spam or unsolicited communications"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Violate any applicable laws or regulations"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Infringe upon intellectual property rights of others"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
            </List>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              5. Data Ownership
            </Typography>
            <Typography paragraph color="text.secondary">
              You retain all rights to the data collected through forms you create. We do not claim ownership of your content or collected data. However, you grant us a license to host, store, and process your data as necessary to provide the service.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              6. Service Availability
            </Typography>
            <Typography paragraph color="text.secondary">
              While we strive to maintain high availability, we do not guarantee uninterrupted access to the service. We reserve the right to modify, suspend, or discontinue the service at any time with reasonable notice.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              7. Limitation of Liability
            </Typography>
            <Typography paragraph color="text.secondary">
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              8. Termination
            </Typography>
            <Typography paragraph color="text.secondary">
              We reserve the right to terminate or suspend your account and access to the service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              9. Changes to Terms
            </Typography>
            <Typography paragraph color="text.secondary">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the service. Continued use of the service after changes constitutes acceptance of the modified terms.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              10. Contact Information
            </Typography>
            <Typography paragraph color="text.secondary">
              For questions about these Terms of Service, please contact us at{' '}
              <Link href="mailto:legal@formbuilder.com" color="primary">legal@formbuilder.com</Link>
            </Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h4" gutterBottom color="text.primary">
              Privacy Policy & Data Processing
            </Typography>
            <Typography variant="caption" color="text.secondary" gutterBottom display="block">
              Last updated: January 19, 2026
            </Typography>
            
            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              1. Introduction
            </Typography>
            <Typography paragraph color="text.secondary">
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Form Builder service. We are committed to protecting your privacy and ensuring transparency in our data processing activities.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              2. Information We Collect
            </Typography>
            
            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }} color="text.primary">
              2.1 Account Information
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="• Name and email address"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Username and password (encrypted)"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Profile information you choose to provide"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
            </List>

            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }} color="text.primary">
              2.2 Form Data
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="• Forms you create, including questions and structure"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Responses submitted to your forms"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Form analytics and usage statistics"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
            </List>

            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }} color="text.primary">
              2.3 Technical Information
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="• IP address and device information"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Browser type and version"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Usage data and interaction with our service"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Cookies and similar tracking technologies"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
            </List>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              3. Legal Basis for Processing (GDPR)
            </Typography>
            <Typography paragraph color="text.secondary">
              We process your personal data based on the following legal grounds:
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Contract Performance"
                  secondary="Processing necessary to provide the Form Builder service you've requested"
                  primaryTypographyProps={{ color: 'text.primary' }}
                  secondaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Legitimate Interest"
                  secondary="Improving our service, preventing fraud, and ensuring security"
                  primaryTypographyProps={{ color: 'text.primary' }}
                  secondaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Consent"
                  secondary="Marketing communications and optional features (where applicable)"
                  primaryTypographyProps={{ color: 'text.primary' }}
                  secondaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Legal Obligation"
                  secondary="Compliance with applicable laws and regulations"
                  primaryTypographyProps={{ color: 'text.primary' }}
                  secondaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
            </List>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              4. How We Use Your Information
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="• Provide, maintain, and improve our Form Builder service"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Process and store form responses on your behalf"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Send service-related notifications and updates"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Respond to your inquiries and provide customer support"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Analyze usage patterns to enhance user experience"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Detect and prevent fraud, abuse, and security incidents"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Comply with legal obligations and enforce our terms"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
            </List>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              5. Data Sharing and Disclosure
            </Typography>
            <Typography paragraph color="text.secondary">
              We do not sell your personal information. We may share your information in the following circumstances:
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Service Providers"
                  secondary="Third-party vendors who assist in providing our service (hosting, analytics, customer support) under strict confidentiality agreements"
                  primaryTypographyProps={{ color: 'text.primary' }}
                  secondaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Legal Requirements"
                  secondary="When required by law, court order, or to protect our rights and safety"
                  primaryTypographyProps={{ color: 'text.primary' }}
                  secondaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Business Transfers"
                  secondary="In connection with a merger, acquisition, or sale of assets, with notice to affected users"
                  primaryTypographyProps={{ color: 'text.primary' }}
                  secondaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="With Your Consent"
                  secondary="When you explicitly authorize us to share your information"
                  primaryTypographyProps={{ color: 'text.primary' }}
                  secondaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
            </List>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              6. Data Security
            </Typography>
            <Typography paragraph color="text.secondary">
              We implement industry-standard security measures to protect your information, including encryption in transit (TLS/SSL), encrypted data storage, regular security audits, access controls and authentication, and secure backup procedures. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              7. Data Retention
            </Typography>
            <Typography paragraph color="text.secondary">
              We retain your personal data for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Account information is kept while your account is active and for a reasonable period thereafter. Form data is retained according to your account settings and applicable legal requirements. Technical logs are typically retained for 90 days.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              8. Your Rights (GDPR & CCPA)
            </Typography>
            <Typography paragraph color="text.secondary">
              You have the following rights regarding your personal data:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="• Right of Access: Request a copy of your personal data"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Right to Rectification: Correct inaccurate or incomplete data"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Right to Erasure: Request deletion of your personal data"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Right to Restrict Processing: Limit how we use your data"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Right to Data Portability: Receive your data in a structured format"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Right to Object: Object to processing based on legitimate interests"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Right to Withdraw Consent: Withdraw consent at any time"
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
            </List>
            <Typography paragraph sx={{ mt: 2 }} color="text.secondary">
              To exercise these rights, contact us at{' '}
              <Link href="mailto:privacy@formbuilder.com" color="primary">privacy@formbuilder.com</Link>
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              9. International Data Transfers
            </Typography>
            <Typography paragraph color="text.secondary">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the European Commission for transfers outside the EEA.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              10. Cookies and Tracking
            </Typography>
            <Typography paragraph color="text.secondary">
              We use cookies and similar technologies for authentication, preferences, analytics, and functionality. You can control cookie settings through your browser, though disabling certain cookies may limit functionality.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              11. Children's Privacy
            </Typography>
            <Typography paragraph color="text.secondary">
              Our service is not intended for children under 16 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              12. Changes to Privacy Policy
            </Typography>
            <Typography paragraph color="text.secondary">
              We may update this Privacy Policy periodically. We will notify you of material changes via email or prominent notice within the service. Your continued use after changes constitutes acceptance.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              13. Data Protection Officer
            </Typography>
            <Typography paragraph color="text.secondary">
              For privacy-related inquiries or to exercise your rights, contact our Data Protection Officer at{' '}
              <Link href="mailto:dpo@formbuilder.com" color="primary">dpo@formbuilder.com</Link>
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              14. Supervisory Authority
            </Typography>
            <Typography paragraph color="text.secondary">
              If you are located in the EEA and believe we have not adequately addressed your concerns, you have the right to lodge a complaint with your local data protection supervisory authority.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="text.primary">
              15. Contact Us
            </Typography>
            <Typography paragraph color="text.secondary">
              For questions about this Privacy Policy or our data practices, contact us at:
            </Typography>
            <Typography paragraph color="text.secondary">
              Email: <Link href="mailto:privacy@formbuilder.com" color="primary">privacy@formbuilder.com</Link><br />
              Address: [Your Company Address]
            </Typography>
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
}