using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;


namespace Web.Portal.DataBase
{
    public class OracleProvider
    {
        private OracleCommand command;
        private OracleDataAdapter dataAdapter;
        private DataSet ds;

        ///// <summary> 
        /////Lấy thông tin chuỗi kết nối database
        ///// </summary> 
        ///// <param name="strSection">strSection</param> 
        ///// <param name="strSection">strKey</param> 
        ///// <param name="strSection">strDefValue</param> 
        ///// <returns>Trả về kiểu string </returns> 
        //private static string GetConfigString(String strSection, String strKey, String strDefValue)
        //{
        //    NameValueCollection nvCol = ConfigurationSettings.GetConfig(strSection) as NameValueCollection;
        //    if (nvCol != null)
        //    {
        //        string strConfig = nvCol[strKey] as String;
        //        if (strConfig != null)
        //        {
        //            return strConfig;
        //        }
        //    }
        //    return strDefValue;
        //}

        /// <summary> 
        ///Lấy thông tin chuỗi kết nối database
        /// </summary>         
        /// <returns>Trả về kiểu string </returns> 
        public static string SQLConnectionString
        {
            get
            {
                return System.Configuration.ConfigurationManager.ConnectionStrings["HemrmesConnection"].ToString();
            }
        }
        public static OracleConnection getConnection()
        {
            string sConn = SQLConnectionString.ToString();
            OracleConnection conn = new OracleConnection(sConn);

            return conn;
        }   



        #region Thuc Hien Thu Tuc
        /// <summary> 
        ///Thực thi một chuỗi sql truyền vào
        /// </summary> 
        /// <param name="sql">Chuỗi sql</param> 
        /// <returns>Trả về kiểu dataset </returns> 
        public DataSet GetData(string sql)
        {
            return OracleHelper.ExecuteDataset(SQLConnectionString, CommandType.Text, sql);

        }
        /// <summary> 
        ///Thực thi thủ tục theo tên và tham số truyền vào
        /// </summary> 
        /// <param name="sql">Chuỗi sql</param>         
        /// <returns>Trả về kiểu số bản ghi thực thi </returns> 
        public int ExecuteNonQuery(string sql)
        {
            return OracleHelper.ExecuteNonQuery(SQLConnectionString, CommandType.Text, sql);
        }

        /// <summary> 
        ///Thực thi thủ tục theo tên và tham số truyền vào
        /// </summary> 
        /// <param name="spName">Tên thủ tục</param> 
        /// <param name="parameters">Các tham số truyền vào</param> 
        /// <returns>Trả về kiểu số bản ghi thực thi </returns> 

        public int ExecuteNonQuery(string spName, params object[] parameters)
        {
            return OracleHelper.ExecuteNonQuery(SQLConnectionString, spName, parameters);
        }
        public int ExecuteNonQueryOut(string spName, string OutValue, params object[] parameters)
        {
            return OracleHelper.ExecuteNonQuery(SQLConnectionString, spName, OutValue, parameters);

        }

        /// <summary> 
        ///Thực thi thủ tục theo tên và tham số truyền vào 
        /// </summary> 
        /// <param name="spName">Tên thủ tục</param> 
        /// /// <param name="parameters">Các tham số truyền vào</param> 
        /// <returns>Trả về kiểu datatable </returns> 
        public DataTable GetTableByProcedure(string spName, params object[] parameters)
        {
            


            return OracleHelper.ExecuteDataset(SQLConnectionString, spName, parameters).Tables[0];
        }
        /// <summary> 
        ///Thực thi thủ tục theo tên và tham số truyền vào 
        /// </summary> 
        /// <param name="spName">Tên thủ tục</param> 
        /// /// <param name="parameters">Các tham số truyền vào</param> 
        /// <returns>Trả về kiểu dataset </returns> 
        public DataSet GetDatasetByProcedure(string spName, params object[] parameters)
        {

            return OracleHelper.ExecuteDataset(SQLConnectionString, spName, parameters);
        }
        /// <summary> 
        ///Thực thi một chuỗi sql truyền vào
        /// </summary> 
        /// <param name="commandtext">Chuỗi sql</param> 
        /// <returns>Trả về kiểu dataset </returns> 
        public DataSet GetDatasetByProcedure(string commandtext)
        {

            return OracleHelper.ExecuteDataset(SQLConnectionString, CommandType.Text, commandtext);
        }
        /// <summary> 
        ///Thực thi thủ tục theo tên và tham số truyền vào 
        /// </summary> 
        /// <param name="spName">Tên thủ tục</param> 
        /// <param name="parameters">Các tham số truyền vào</param> 
        /// <returns>Trả về kiểu OracleDataReader </returns> 
        public OracleDataReader GetByOracleDataReader(string spName, int ID)
        {
            OracleParameter pramOut = new OracleParameter();
            pramOut.OracleDbType = OracleDbType.RefCursor;
            pramOut.ParameterName = "out_DATA";
            pramOut.Direction = ParameterDirection.Output;

            return OracleHelper.ExecuteReader(SQLConnectionString, spName, ID, pramOut);
        }
        public OracleDataReader GetScriptOracleDataReader(string script)
        {
           

            return OracleHelper.ExecuteReader(SQLConnectionString,CommandType.Text, script);
        }
        public OracleDataReader GetByOracleDataReader(string spName, params object[] parames)
        {
            OracleParameter pramOut = new OracleParameter();
            pramOut.OracleDbType = OracleDbType.RefCursor;
            pramOut.ParameterName = "out_DATA";
            pramOut.Direction = ParameterDirection.Output;
            object[] prs = new object[parames.Length + 1];
            for (int i = 0; i < parames.Length; i++)
                prs[i] = parames[i];
            prs[parames.Length] = pramOut;


            return OracleHelper.ExecuteReader(SQLConnectionString, spName, prs);
        }
        public OracleDataReader GetByOracleDataReader(string spName)
        {
            OracleParameter pramOut = new OracleParameter();
            pramOut.OracleDbType = OracleDbType.RefCursor;
            pramOut.ParameterName = "out_DATA";
            pramOut.Direction = ParameterDirection.Output;

            return OracleHelper.ExecuteReader(SQLConnectionString, spName, pramOut);
        }


        /// <summary>
        /// Thực thi thủ tục theo tên và tham số tên bảng danh mục, id dữ liệu truyền vào
        /// </summary>
        /// <param name="spName"></param>
        /// <param name="tableName"></param>
        /// <param name="ID"></param>
        /// <returns>Trả về kiểu OracleDataReader </returns>
        public OracleDataReader GetDanhMucByOracleDataReader(string spName, string tableName, int ID)
        {
            OracleParameter pramOut = new OracleParameter();
            pramOut.OracleDbType = OracleDbType.RefCursor;
            pramOut.ParameterName = "out_DATA1";
            pramOut.Direction = ParameterDirection.Output;

            return OracleHelper.ExecuteReader(SQLConnectionString, spName, tableName, ID, pramOut);
        }

        ///  <summary>  
        ///Thực thi thủ tục theo tên và tham số truyền vào 
        ///  </summary>  
        ///  <param name="spName">Tên thủ tục</param>  
        ///  /// <param name="parameters">Các tham số truyền vào</param>  
        ///  <returns>Trả về kiểu dataset </returns>  
        public DataSet GetSelectAllData(string spName)
        {

            OracleParameter pramOut = new OracleParameter();
            pramOut.OracleDbType = OracleDbType.RefCursor;
            pramOut.ParameterName = "out_DATA";
            pramOut.Direction = ParameterDirection.Output;
            return OracleHelper.ExecuteDataset(SQLConnectionString, CommandType.StoredProcedure, spName, pramOut);
        }
        /// <summary>
        /// Get dữ liệu với phân trang
        /// </summary>
        /// <param name="spName"></param>
        /// <param name="strNameOfParamTotal"></param>
        /// <param name="strNameOfParamRefCursor"></param>
        /// <param name="oParamOrderName"></param>
        /// <param name="oParamOrderValue"></param>
        /// <param name="oParamSortFieldName"></param>
        /// <param name="oParamSortFieldValue"></param>
        /// <param name="oParamNumPerPageName"></param>
        /// <param name="rowsNum"></param>
        /// <param name="oParamPageName"></param>
        /// <param name="page"></param>
        /// <param name="totalRecords"></param>
        /// <returns></returns>
        /// <Modified>
        /// Author      Date        Comment

        /// </Modified>
        public DataTable GetTableByProcedurePaging(string spName, string strNameOfParamTotal, string strNameOfParamRefCursor, string oParamOrderName, string oParamOrderValue, string oParamSortFieldName,
            string oParamSortFieldValue, string oParamNumPerPageName, int rowsNum,
            string oParamPageName, int page, out int totalRecords)
        {
            return OracleHelper.ExecuteNonQuery(SQLConnectionString, CommandType.StoredProcedure, spName, strNameOfParamTotal,
                strNameOfParamRefCursor, oParamOrderName, oParamOrderValue, oParamSortFieldName, oParamSortFieldValue, oParamNumPerPageName, rowsNum, oParamPageName, page, out totalRecords);
        }
        /// <summary>
        /// Get dữ liệu với phân trang
        /// </summary>
        /// <param name="spName"></param>
        /// <param name="paramArray"></param>
        /// <param name="totalRecords"></param>
        /// <returns></returns>
        /// <Modified>


        /// </Modified>
        public DataTable GetTableByProcedurePaging(string spName, object[] paramArray, out int totalRecords)
        {

            return OracleHelper.ExecuteNonQuery(SQLConnectionString, CommandType.StoredProcedure, spName, paramArray, out totalRecords);
        }

        protected object GetValueField(OracleDataReader reader, string FieldName, object DefaultValue)
        {

            if (Enumerable.Range(0, reader.FieldCount)
                   .Select(reader.GetName)
                   .Contains(FieldName, StringComparer.OrdinalIgnoreCase) && reader[FieldName] != DBNull.Value)
                return reader[FieldName];
            return DefaultValue;
        }
        protected DateTime? GetValueDateTimeField(OracleDataReader reader, string FieldName, DateTime? DefaultValue)
        {

            if (Enumerable.Range(0, reader.FieldCount)
                   .Select(reader.GetName)
                   .Contains(FieldName, StringComparer.OrdinalIgnoreCase) && reader[FieldName] != DBNull.Value)
                return Convert.ToDateTime(reader[FieldName]);
            return DefaultValue;
        }
        protected object GetNullDateTime(DateTime? dateValue)
        {
            if (dateValue.HasValue)
                return dateValue;
            else
                return DBNull.Value;
        }

        #endregion
    }
}

