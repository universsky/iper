package universsky.iper.fileload;

/**
 * @author 东海陈光剑
 *  2014年4月20日 下午1:38:59 
 */
import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import universsky.iper.config.Config;
import universsky.iper.util.Util;

public class Upload extends HttpServlet {

	private static final long serialVersionUID = 8871557406601817971L;
	File tempPathFile;

	public void init() throws ServletException {
		File uploadFile = new File(Config.UPLOAD_PATH);
		if (!uploadFile.exists()) {
			uploadFile.mkdirs();
		}
		File tempPathFile = new File(Config.TEMP_PATH);
		if (!tempPathFile.exists()) {
			tempPathFile.mkdirs();
		}
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		try {
			// Create a factory for disk-based file items
			DiskFileItemFactory factory = new DiskFileItemFactory();

			// Set factory constraints
			factory.setSizeThreshold(4096); // 设置缓冲区大小，这里是4kb
			factory.setRepository(tempPathFile);// 设置缓冲区目录

			// Create a new file upload handler
			ServletFileUpload upload = new ServletFileUpload(factory);

			// Set overall request size constraint
			upload.setSizeMax(10485760); // 设置最大文件尺寸，这里是10MB
			List<FileItem> items = upload.parseRequest(request);// 得到所有的文件
			Iterator<FileItem> i = items.iterator();
			while (i.hasNext()) {
				FileItem fi = (FileItem) i.next();
				String fileName = fi.getName();
				if (fileName != null) {
					File fullFile = new File(fi.getName());
					File savedFile = new File(Config.UPLOAD_PATH,
							fullFile.getName());
					fi.write(savedFile);
				}

				String timeStamp = Util.getTimeStamp();
				System.out.println("[ " + timeStamp + " ] " + fileName
						+ " upload successfully! The file path is "
						+ Config.UPLOAD_PATH);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}