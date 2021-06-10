using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.DataAccess
{
    public class IMP_CUSTOMER_REQUEST_ACCESS:DataBase.DataProvider
    {
        private string SQL_SELECT = "select CODE,INFOR,PEOPLE,REMARK,YEAR,TYPE,IDNO,COMID,CREATED,USERID from IMP_CUSTOMER_REQUEST";
        public void Add(Web.Portal.Layer.IMP_CUSTOMER_REQUEST objIMP_CUSTOMER_REQUEST)
        {
            CommandStore32("IMP_CUSTOMER_REQUEST_Add", objIMP_CUSTOMER_REQUEST.CODE,
                                            objIMP_CUSTOMER_REQUEST.INFOR,
                                            objIMP_CUSTOMER_REQUEST.PEOPLE,
                                            objIMP_CUSTOMER_REQUEST.REMARK,
                                            objIMP_CUSTOMER_REQUEST.YEAR,
                                            objIMP_CUSTOMER_REQUEST.TYPE,
                                            objIMP_CUSTOMER_REQUEST.IDNO,
                                            objIMP_CUSTOMER_REQUEST.COMID, DateTime.Now, objIMP_CUSTOMER_REQUEST.USERID);
        }
        public string GenCode()
        {
            string code = string.Empty;
            using (System.Data.IDataReader reader = CommandScriptDataReader("select max(Convert(bigint, Code)+1) CODE from IMP_CUSTOMER_REQUEST"))
            {

                if (reader.Read())
                {
                    code =Convert.ToString(GetValueField(reader,"CODE",1));
                    while(code.Length<10)
                    {
                        code = "0" + code;
                    }
                }

            }
            return code;
        }
        public void Update(string CODE,Web.Portal.Layer.IMP_CUSTOMER_REQUEST objIMP_CUSTOMER_REQUEST)
        {
             CommandStore32("IMP_CUSTOMER_REQUEST_Update",CODE.Trim(), objIMP_CUSTOMER_REQUEST.CODE,
                                            objIMP_CUSTOMER_REQUEST.INFOR,
                                            objIMP_CUSTOMER_REQUEST.PEOPLE,
                                            objIMP_CUSTOMER_REQUEST.REMARK,
                                            objIMP_CUSTOMER_REQUEST.YEAR,
                                            objIMP_CUSTOMER_REQUEST.TYPE,
                                            objIMP_CUSTOMER_REQUEST.IDNO,
                                            objIMP_CUSTOMER_REQUEST.COMID, DateTime.Now, objIMP_CUSTOMER_REQUEST.USERID);
        }
        public void Delete(string CODE,string year)
        {
            CommandScript(string.Format("delete from IMP_CUSTOMER_REQUEST where CODE='{0}' and YEAR='{1}'",CODE.Trim(),year.Trim()));
        }
        private Web.Portal.Layer.IMP_CUSTOMER_REQUEST GetProperties(System.Data.IDataReader reader)
        {
            Web.Portal.Layer.IMP_CUSTOMER_REQUEST objIMP_CUSTOMER_REQUEST = new Web.Portal.Layer.IMP_CUSTOMER_REQUEST();
            objIMP_CUSTOMER_REQUEST.CODE = Convert.ToString(GetValueField(reader, "CODE", string.Empty));
            objIMP_CUSTOMER_REQUEST.INFOR = Convert.ToString(GetValueField(reader, "INFOR", string.Empty));
            objIMP_CUSTOMER_REQUEST.PEOPLE = Convert.ToString(GetValueField(reader, "PEOPLE", string.Empty));
            objIMP_CUSTOMER_REQUEST.REMARK = Convert.ToString(GetValueField(reader, "REMARK", string.Empty));
            objIMP_CUSTOMER_REQUEST.YEAR = Convert.ToString(GetValueField(reader, "YEAR", DateTime.Now.Year));
            objIMP_CUSTOMER_REQUEST.TYPE = Convert.ToInt32(GetValueField(reader, "TYPE", 0));
            objIMP_CUSTOMER_REQUEST.IDNO = Convert.ToString(GetValueField(reader, "IDNO", string.Empty));
            objIMP_CUSTOMER_REQUEST.COMID = Convert.ToString(GetValueField(reader, "COMID", string.Empty));           
            objIMP_CUSTOMER_REQUEST.CREATED = GetValueDateTimeField(reader, "CREATED", objIMP_CUSTOMER_REQUEST.CREATED);
            objIMP_CUSTOMER_REQUEST.USERID = Convert.ToInt32(GetValueField(reader, "USERID", 0));
            objIMP_CUSTOMER_REQUEST.Content= Convert.ToString(GetValueField(reader, "CONTENT", string.Empty));
            return objIMP_CUSTOMER_REQUEST;
        }
        

        public void UpdateYear(int from,int to,int userId,string code)
        {
            CommandScript("INSERT INTO IMP_CUSTOMER_REQUEST(CODE,INFOR,PEOPLE,REMARK,YEAR,TYPE,IDNO,COMID,USERID) SELECT  CODE,INFOR,PEOPLE,REMARK,'"+to+"',TYPE,IDNO,COMID,USERID from IMP_CUSTOMER_REQUEST where YEAR='"+from+"' and CODE ='"+code+"'");
        }
        public Web.Portal.Layer.IMP_CUSTOMER_REQUEST GetByID(string CODE,string YEAR)
        {
            using (System.Data.IDataReader reader = CommandScriptDataReader(string.Format(SQL_SELECT + " where CODE='{0}' and YEAR='{1}'",CODE.Trim(),YEAR.Trim())))
            {

                if (reader.Read())
                    return GetProperties(reader);

            }
            return new Web.Portal.Layer.IMP_CUSTOMER_REQUEST();
        }
        public IList<Layer.IMP_CUSTOMER_REQUEST> GetPaging(int page, int pageSize, string year,string Code,string INFOR,string PEOPLE,string IDNO, ref int totalRows)
        {
            IList<Layer.IMP_CUSTOMER_REQUEST> IMP_CUSTOMER_REQUESTList = new List<Layer.IMP_CUSTOMER_REQUEST>();
            using (System.Data.IDataReader reader = CommandDataReader("IMP_CUSTOMER_REQUEST_GetPaging", page, pageSize,
                year,Code.Trim(),INFOR.Trim(),PEOPLE.Trim(),IDNO
                ))
            {
                while (reader.Read())
                {
                    totalRows = Convert.ToInt32(GetValueField(reader, "totalRows", 0));
                    IMP_CUSTOMER_REQUESTList.Add(GetProperties(reader));
                    
                }
            }
            return IMP_CUSTOMER_REQUESTList;

        }
    }
}
