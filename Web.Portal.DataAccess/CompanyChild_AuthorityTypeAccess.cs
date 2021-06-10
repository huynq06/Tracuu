using System;
using System.Collections.Generic;

namespace Web.Portal.DataAccess
{
    public class CompanyChild_AuthorityTypeAccess : DataBase.DataProvider
    {
        public IList<Layer.CompanyChild_AuthorityType> GetAll()
        {
            IList<Layer.CompanyChild_AuthorityType> AuthorityTypeList = new List<Layer.CompanyChild_AuthorityType>();
            try
            {
                using (System.Data.IDataReader reader = CommandDataReader("S_CompanyChild_AuthorityType", 0,0, "", ""))
                {
                    while (reader.Read())
                    {
                        AuthorityTypeList.Add(GetProperties(reader));
                    }
                }
            }
            catch(Exception ex)
            {
                Console.Write(ex.ToString());
            }
          
            return AuthorityTypeList;
        }
        public Layer.CompanyChild_AuthorityType GetById(int id)
        {
            Layer.CompanyChild_AuthorityType AuthorityType = new Layer.CompanyChild_AuthorityType();
            try
            {
                using (System.Data.IDataReader reader = CommandDataReader("S_CompanyChild_AuthorityType", 4, id, "", ""))
                {
                    while (reader.Read())
                    {
                        AuthorityType = GetProperties(reader);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString());
            }

            return AuthorityType;
        }
        private Web.Portal.Layer.CompanyChild_AuthorityType GetProperties(System.Data.IDataReader reader)
        {
            Web.Portal.Layer.CompanyChild_AuthorityType objAuthorityType = new Web.Portal.Layer.CompanyChild_AuthorityType();
            objAuthorityType.Id = Convert.ToInt32(GetValueField(reader, "Id", 0));
            objAuthorityType.AuthorityType = Convert.ToString(GetValueField(reader, "AuthorityType", string.Empty)).Trim();
            objAuthorityType.ShortName = Convert.ToString(GetValueField(reader, "ShortName", string.Empty)).Trim();
            objAuthorityType.TableContentOrder = Convert.ToString(GetValueField(reader, "TableContentOrder", string.Empty)).Trim();
            

            return objAuthorityType;
        }
    }
}