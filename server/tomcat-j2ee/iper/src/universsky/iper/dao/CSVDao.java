package universsky.iper.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import universsky.iper.report.IperCSV;
import universsky.iper.result.CSVFileIO;

/**
 * @author 东海陈光剑 2014年5月22日 下午4:10:52
 * 
 */
public class CSVDao {

	private String run_stamp = (new IperCSV()).getRun_stamp();
	List<HashMap<String, ArrayList<String>>> result = (new CSVFileIO())
			.query(run_stamp);

}
