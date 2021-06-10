using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.DataAccess
{
    public class CompanyChildAccess:DataBase.DataProvider
    {
        private string SQL_SELECT = "select CompanyChildId,CompanyId,ParentId,TypeDoc,Description,Year,Created,CreatedName from CompanyChild";
        public int Add(Web.Portal.Layer.CompanyChild objCompanyChild)
        {
            return CommandStore32("CompanyChild_Add", objCompanyChild.CompanyId,
                                           objCompanyChild.ParentId,
                                            objCompanyChild.TypeDoc,
                                            objCompanyChild.Description, 
                                            objCompanyChild.Year,  
                                            objCompanyChild.CreatedName,                                       
                                             DateTime.Now
                                             );
        }
        

        public void Update(Web.Portal.Layer.CompanyChild objCompanyChild)
        {
            CommandStore32("CompanyChild_Update",objCompanyChild.CompanyChildId,
                                        objCompanyChild.CompanyId,
                                          objCompanyChild.ParentId,
                                            
                                            objCompanyChild.TypeDoc,
                                            objCompanyChild.Description,objCompanyChild.Year,
                                            objCompanyChild.CreatedName,
                                            DateTime.Now);
        }

        public void Delete(int CompanyId)
        {
            CommandStore32("CompanyBussiness_Delete", CompanyId);
        }
        private Web.Portal.Layer.CompanyChild GetProperties(System.Data.IDataReader reader)
        {
            Web.Portal.Layer.CompanyChild objCompanyChild = new Web.Portal.Layer.CompanyChild();
            objCompanyChild.CompanyChildId = Convert.ToInt32(GetValueField(reader, "CompanyChildId", 0));
            objCompanyChild.CompanyId = Convert.ToInt32(GetValueField(reader, "CompanyId", 0));
            objCompanyChild.ParentId = Convert.ToInt32(GetValueField(reader, "ParentId", 0));            
            objCompanyChild.TypeDoc = Convert.ToString(GetValueField(reader, "TypeDoc", string.Empty)).ToUpper();
            objCompanyChild.Description = Convert.ToString(GetValueField(reader, "Description", string.Empty)).ToUpper();
            objCompanyChild.Year = Convert.ToInt32(GetValueField(reader, "Year", DateTime.Now.Year));
            objCompanyChild.Created = GetValueDateTimeField(reader, "Created", objCompanyChild.Created);
            objCompanyChild.CreatedName = Convert.ToString(GetValueField(reader, "CreatedName", string.Empty)).ToUpper();
            objCompanyChild.FromDate = GetValueDateTimeField(reader, "FromDate", objCompanyChild.FromDate);
            objCompanyChild.ToDate = GetValueDateTimeField(reader, "ToDate", objCompanyChild.ToDate);

            return objCompanyChild;
        }
        public Web.Portal.Layer.CompanyChild GetByID(int CompanyChildId)
        {
            using (System.Data.IDataReader reader = CommandScriptDataReader(string.Format(SQL_SELECT + " where CompanyChildId='{0}'", CompanyChildId)))
            {

                if (reader.Read())
                    return GetProperties(reader);

            }
            return new Web.Portal.Layer.CompanyChild();
        }
        public Web.Portal.Layer.CompanyChild GetByID(int CompanyId,int parentId,int year)
        {
            using (System.Data.IDataReader reader = CommandScriptDataReader(string.Format(SQL_SELECT + " where CompanyId={0} and ParentId={1} and Year={2}", CompanyId,parentId,year)))
            {

                if (reader.Read())
                    return GetProperties(reader);

            }
            return new Web.Portal.Layer.CompanyChild();
        }
        public IList<Layer.CompanyChild> GetPaging(int Year,string code,string name,string nameChild,string idno)
        {
            IList<Layer.CompanyChild> CompanyChildList = new List<Layer.CompanyChild>();
            using (System.Data.IDataReader reader = CommandDataReader("CompanyChild_GetPaging", Year,
                code,name,nameChild,idno
                
                ))
            {
                while (reader.Read())
                {

                    CompanyChildList.Add(GetProperties(reader));

                }
            }
            return CompanyChildList;

        }
    }
}
