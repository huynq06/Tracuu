using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Sercurity
{
   public  class OrganizationAccess : Web.Portal.DataBase.DataProvider
    {
        private string SQL_SELECT = "SELECT OrganizationId"
                                              
                                              + ",Name"
                                              + ",ThuTu"
                                            

                                              + "  FROM Organization";


        public int Add(Web.Portal.Sercurity.Organization Organization)
        {
            return CommandStore32("Organization_Add", Organization.Name
                                               , Organization.ThuTu
                                               
                                               );
        }
        public int Update(Web.Portal.Sercurity.Organization Organization)
        {
            return CommandStore32("Organization_Update", Organization.OrganizationId, 
                                                     Organization.Name
                                               , Organization.ThuTu
                                               
                                                  );
        }

        public int Delete(int groupId)
        {
            return CommandScriptReturn(string.Format("delete from Organization where OrganizationId={0};select @@ROWCOUNT;", groupId));
        }


        private Web.Portal.Sercurity.Organization GetProperties(System.Data.IDataReader reader)
        {
            Web.Portal.Sercurity.Organization Organization = new Web.Portal.Sercurity.Organization();
            Organization.OrganizationId = Convert.ToInt32(GetValueField(reader, "OrganizationId", 0));
           
            Organization.Name = Convert.ToString(GetValueField(reader, "Name", string.Empty));
            
            Organization.ThuTu = Convert.ToInt32(GetValueField(reader, "ThuTu", 1));

            return Organization;
        }
        public Web.Portal.Sercurity.Organization GetByID(int OrganizationId)
        {
            using (System.Data.IDataReader reader = CommandScriptDataReader(string.Format(SQL_SELECT + " where OrganizationId={0}", OrganizationId)))
            {

                if (reader.Read())
                    return GetProperties(reader);

            }
            return new Web.Portal.Sercurity.Organization();
        }

        public IList<Web.Portal.Sercurity.Organization> GetAll(string Type_, int ParentId)
        {
            IList<Web.Portal.Sercurity.Organization> OrganizationList = new List<Web.Portal.Sercurity.Organization>();
            using (System.Data.IDataReader reader = CommandScriptDataReader(string.Format(SQL_SELECT + " where Type_='{0}' and ParentId={1}", Type_, ParentId)))
            {

                while (reader.Read())
                    OrganizationList.Add(GetProperties(reader));

            }
            return OrganizationList;
        }
        public IList<Web.Portal.Sercurity.Organization> GetAll()
        {
            IList<Web.Portal.Sercurity.Organization> OrganizationList = new List<Web.Portal.Sercurity.Organization>();
            using (System.Data.IDataReader reader = CommandScriptDataReader(SQL_SELECT))
            {

                while (reader.Read())
                    OrganizationList.Add(GetProperties(reader));

            }
            return OrganizationList;
        }
        public IList<Web.Portal.Sercurity.Organization> GetAll(int ParentId)
        {
            IList<Web.Portal.Sercurity.Organization> OrganizationList = new List<Web.Portal.Sercurity.Organization>();
            using (System.Data.IDataReader reader = CommandScriptDataReader(string.Format(SQL_SELECT + " where ParentId={0}", ParentId)))
            {

                while (reader.Read())
                    OrganizationList.Add(GetProperties(reader));

            }
            return OrganizationList;
        }
        public IList<Web.Portal.Sercurity.Organization> GetPaging(int page, int pageSize, string Name, string Type_, int ParentId, ref int total)
        {
            IList<Web.Portal.Sercurity.Organization> OrganizationList = new List<Web.Portal.Sercurity.Organization>();
            using (System.Data.IDataReader reader = CommandDataReader("Organization_GetPaging", page, pageSize, Name.Trim(), Type_.Trim(), ParentId))
            {

                while (reader.Read())
                {
                    OrganizationList.Add(GetProperties(reader));
                    total = Convert.ToInt32(GetValueField(reader, "totalRows", 0));
                }


            }
            return OrganizationList;
        }
    }
}

