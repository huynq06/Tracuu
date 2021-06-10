using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.DataAccess
{
    public class CUSTOMER_DETAILS_ACCESS : DataBase.DataProvider
    {
        private string SQL_SELECT = "select ID,CODE,INFOR,REMARK,YEAR,IDNO from CUSTOMER_DETAILS";
        public void Add(Web.Portal.Layer.CUSTOMER_DETAILS objCUSTOMER_DETAILS)
        {
            CommandStore32("CUSTOMER_DETAILS_Add", objCUSTOMER_DETAILS.CODE,
                                            objCUSTOMER_DETAILS.INFOR,
                                              objCUSTOMER_DETAILS.YEAR,
                                            objCUSTOMER_DETAILS.REMARK,
                                            objCUSTOMER_DETAILS.IDNO);
        }
        public void Update(Web.Portal.Layer.CUSTOMER_DETAILS objCUSTOMER_DETAILS)
        {
            CommandStore32("CUSTOMER_DETAILS_UPDATE",objCUSTOMER_DETAILS.ID, objCUSTOMER_DETAILS.CODE,
                                            objCUSTOMER_DETAILS.INFOR,
                                              objCUSTOMER_DETAILS.YEAR,
                                            objCUSTOMER_DETAILS.REMARK,
                                            objCUSTOMER_DETAILS.IDNO);
        }
        public Web.Portal.Layer.CUSTOMER_DETAILS GetByID(Int64 id)
        {
            using (System.Data.IDataReader reader = CommandScriptDataReader(string.Format(SQL_SELECT + " where ID={0}", id)))
            {

                if (reader.Read())
                    return GetProperties(reader);

            }
            return new Web.Portal.Layer.CUSTOMER_DETAILS();
        }
        public void Delete(Int64 ID)
        {
            CommandScript(string.Format("delete from CUSTOMER_DETAILS where ID={0}", ID));
        }
        private Web.Portal.Layer.CUSTOMER_DETAILS GetProperties(System.Data.IDataReader reader)
        {
            Web.Portal.Layer.CUSTOMER_DETAILS objCUSTOMER_DETAILS = new Web.Portal.Layer.CUSTOMER_DETAILS();
            objCUSTOMER_DETAILS.ID = Convert.ToInt64(GetValueField(reader, "ID", 0));
            objCUSTOMER_DETAILS.CODE = Convert.ToString(GetValueField(reader, "CODE", string.Empty));
            objCUSTOMER_DETAILS.INFOR = Convert.ToString(GetValueField(reader, "INFOR", string.Empty));
            objCUSTOMER_DETAILS.REMARK = Convert.ToString(GetValueField(reader, "REMARK", string.Empty));
            objCUSTOMER_DETAILS.YEAR = Convert.ToString(GetValueField(reader, "YEAR", DateTime.Now.Year));
            objCUSTOMER_DETAILS.IDNO = Convert.ToString(GetValueField(reader, "IDNO", string.Empty));   
                 
            return objCUSTOMER_DETAILS;
        }
        public IList<Layer.CUSTOMER_DETAILS> GetByCode(string Code)
        {
            IList<Layer.CUSTOMER_DETAILS> CUSTOMER_DETAILSList = new List<Layer.CUSTOMER_DETAILS>();
            using (System.Data.IDataReader reader = CommandScriptDataReader(string.Format(SQL_SELECT + " where CODE='{0}'", Code.Trim())))
            {
                while (reader.Read())
                {
                    
                    CUSTOMER_DETAILSList.Add(GetProperties(reader));

                }
            }
            return CUSTOMER_DETAILSList;

        }
        public IList<Layer.CUSTOMER_DETAILS> GetByInfo(string Infor,string year)
        {
            IList<Layer.CUSTOMER_DETAILS> CUSTOMER_DETAILSList = new List<Layer.CUSTOMER_DETAILS>();
            using (System.Data.IDataReader reader = CommandDataReader("CUSTOMER_DETAILS_BYINFOR",Infor.Trim(),year.Trim()))
            {
                while (reader.Read())
                {

                    CUSTOMER_DETAILSList.Add(GetProperties(reader));

                }
            }
            return CUSTOMER_DETAILSList;

        }
    }
}
