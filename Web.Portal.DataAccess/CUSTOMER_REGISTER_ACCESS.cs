using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.DataAccess
{
    public class CUSTOMER_REGISTER_ACCESS : DataBase.DataProvider
    {
        private string SQL_SELECT = "select CUSID,INFOR,REMARK,REMARK1,CREATED from CUSTOMER_REGISTER";
        public void Add(Web.Portal.Layer.CUSTOMER_REGISTER objCUSTOMER_REGISTER)
        {
            CommandStore32("CUSTOMER_REGISTER_Add", objCUSTOMER_REGISTER.CUSID,
                                            objCUSTOMER_REGISTER.INFOR,
                                            objCUSTOMER_REGISTER.REMARK,
                                            objCUSTOMER_REGISTER.REMARK1,
                                           
                                             DateTime.Now);
        }
        public string GenCode()
        {
            string code = string.Empty;
            using (System.Data.IDataReader reader = CommandScriptDataReader("select max(Convert(bigint, CUSID)+1) CODE from CUSTOMER_REGISTER"))
            {

                if (reader.Read())
                {
                    code = Convert.ToString(GetValueField(reader, "CODE", 1));
                    while (code.Length < 10)
                    {
                        code = "0" + code;
                    }
                }

            }
            return code;
        }
        public void Update(string CODE, Web.Portal.Layer.CUSTOMER_REGISTER objCUSTOMER_REGISTER)
        {
            CommandStore32("CUSTOMER_REGISTER_Update",
                                           CODE.Trim(),
                                           objCUSTOMER_REGISTER.CUSID,
                                           objCUSTOMER_REGISTER.INFOR,                                           
                                           objCUSTOMER_REGISTER.REMARK,
                                           objCUSTOMER_REGISTER.REMARK1,
                                            DateTime.Now);
        }
        public void Delete(string CODE)
        {
            CommandScript(string.Format("delete from CUSTOMER_REGISTER where CUSID='{0}'", CODE.Trim()));
        }
        private Web.Portal.Layer.CUSTOMER_REGISTER GetProperties(System.Data.IDataReader reader)
        {
            Web.Portal.Layer.CUSTOMER_REGISTER objCUSTOMER_REGISTER = new Web.Portal.Layer.CUSTOMER_REGISTER();
            objCUSTOMER_REGISTER.CUSID = Convert.ToString(GetValueField(reader, "CUSID", string.Empty));
            objCUSTOMER_REGISTER.INFOR = Convert.ToString(GetValueField(reader, "INFOR", string.Empty));
            objCUSTOMER_REGISTER.REMARK1 = Convert.ToString(GetValueField(reader, "REMARK1", string.Empty));
            objCUSTOMER_REGISTER.REMARK = Convert.ToString(GetValueField(reader, "REMARK", string.Empty));
           
            objCUSTOMER_REGISTER.CREATED = GetValueDateTimeField(reader, "CREATED", objCUSTOMER_REGISTER.CREATED);
         
            return objCUSTOMER_REGISTER;
        }


        
        public Web.Portal.Layer.CUSTOMER_REGISTER GetByID(string CODE)
        {
            using (System.Data.IDataReader reader = CommandScriptDataReader(string.Format(SQL_SELECT + " where CUSID='{0}'", CODE.Trim())))
            {

                if (reader.Read())
                    return GetProperties(reader);

            }
            return new Web.Portal.Layer.CUSTOMER_REGISTER();
        }
        public IList<Layer.CUSTOMER_REGISTER> GetPaging(int page, int pageSize,  string Code, string INFOR, string REMARK, string REMARK1, ref int totalRows)
        {
            IList<Layer.CUSTOMER_REGISTER> CUSTOMER_REGISTERList = new List<Layer.CUSTOMER_REGISTER>();
            using (System.Data.IDataReader reader = CommandDataReader("CUSTOMER_REGISTER_GetPaging", page, pageSize,
                 Code.Trim(), INFOR.Trim(), REMARK.Trim(), REMARK1
                ))
            {
                while (reader.Read())
                {
                    totalRows = Convert.ToInt32(GetValueField(reader, "totalRows", 0));
                    CUSTOMER_REGISTERList.Add(GetProperties(reader));

                }
            }
            return CUSTOMER_REGISTERList;

        }
    }
}