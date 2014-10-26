package universsky.iper.utils;

import java.util.Date;
import java.util.Properties;

import javax.activation.CommandMap;
import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.activation.MailcapCommandMap;
import javax.mail.Address;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

/**
 * 发送邮件给多个接收者、抄送邮件
 */
public class MailSender {

	private static final String LOG_TAG = MailSender.class.getSimpleName();
	private static final int PORT = 25;

	/**
	 * 以文本格式发送邮件
	 * 
	 * @param sender
	 * @param encryptPassword
	 * @param smtp
	 * @param subject
	 * @param content
	 * @param file
	 * @param maillists
	 * @return
	 */
	public static synchronized boolean sendTextMail(String sender,
			String encryptPassword, String smtp, String subject,
			String content, String file, String[] maillists) {
		if (maillists == null || maillists.length == 0
				|| ("".equals(maillists[0].trim()))) {
			return false;
		} else {
			// Get system properties
			Properties props = new Properties();

			// Setup mail server
			props.put("mail.smtp.host", smtp);
			props.put("mail.smtp.port", PORT);
			// Get session
			props.put("mail.smtp.auth", "true"); // 如果需要密码验证，把这里的false改成true

			// 判断是否需要身份认证
			CustomizedAuthenticator authenticator = null;
			if (true) {
				// 如果需要身份认证，则创建一个密码验证器
				authenticator = new CustomizedAuthenticator(sender,
						encryptPassword);
			}
			// 根据邮件会话属性和密码验证器构造一个发送邮件的session
			Session sendMailSession = Session.getInstance(props, authenticator);
			try {
				// 根据session创建一个邮件消息
				Message mailMessage = new MimeMessage(sendMailSession);
				// 创建邮件发送者地址
				Address from = new InternetAddress(sender);
				// 设置邮件消息的发送者
				mailMessage.setFrom(from);
				// 创建邮件的接收者地址，并设置到邮件消息中
				Address[] tos = null;

				tos = new InternetAddress[maillists.length];
				for (int i = 0; i < maillists.length; i++) {
					tos[i] = new InternetAddress(maillists[i]);
				}

				// Message.RecipientType.TO属性表示接收者的类型为TO
				mailMessage.setRecipients(Message.RecipientType.TO, tos);
				// 设置邮件消息的主题
				mailMessage.setSubject(subject);
				// 设置邮件消息发送的时间
				mailMessage.setSentDate(new Date());

				BodyPart bodyPart = new MimeBodyPart();
				bodyPart.setText(content);

				MimeBodyPart attachPart = new MimeBodyPart();
				DataSource source = new FileDataSource(file);
				attachPart.setDataHandler(new DataHandler(source));
				attachPart.setFileName(file);

				Multipart multipart = new MimeMultipart();
				multipart.addBodyPart(bodyPart);
				multipart.addBodyPart(attachPart);

				mailMessage.setContent(multipart);
				MailcapCommandMap mc = (MailcapCommandMap) CommandMap
						.getDefaultCommandMap();
				mc.addMailcap("text/html;; x-java-content-handler=com.sun.mail.handlers.text_html");
				mc.addMailcap("text/xml;; x-java-content-handler=com.sun.mail.handlers.text_xml");
				mc.addMailcap("text/plain;; x-java-content-handler=com.sun.mail.handlers.text_plain");
				mc.addMailcap("multipart/*;; x-java-content-handler=com.sun.mail.handlers.multipart_mixed");
				mc.addMailcap("message/rfc822;; x-java-content-handler=com.sun.mail.handlers.message_rfc822");
				CommandMap.setDefaultCommandMap(mc);
				Transport.send(mailMessage);
				return true;
			} catch (MessagingException ex) {
				ex.printStackTrace();
			}
		}
		return false;
	}
}
