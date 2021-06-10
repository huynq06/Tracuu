using System;
using System.Collections.Generic;
using System.Linq;

namespace Web.Portal.DataAccess
{
    public class CompanyChild_AuthorityAccess : DataBase.DataProvider
    {
        public IList<Layer.CompanyChild_Authority> GetAll()
        {
            IList<Layer.CompanyChild_Authority> AuthorityList = new List<Layer.CompanyChild_Authority>();
            //try
            //{
            //    using (System.Data.IDataReader reader = CommandDataReader("S_CompanyChild_AuthorityType", 0, 0, "", ""))
            //    {
            //        while (reader.Read())
            //        {
            //            AuthorityTypeList.Add(GetProperties(reader));
            //        }
            //    }
            //}
            //catch (Exception ex)
            //{
            //    Console.Write(ex.ToString());
            //}

            return AuthorityList;
        }
        public IList<Layer.CompanyChild_Authority> getTableContentByName(string parentName, string childName, int year)
        {
            IList<Layer.CompanyChild_Authority> AuthorityData = new List<Layer.CompanyChild_Authority>();
            using (System.Data.IDataReader reader = CommandDataReader("S_CompanyChild_TableContent_GetByName", parentName.ToUpper().Trim(), childName.ToUpper().Trim(), year))
            {

                while (reader.Read())
                {
                    AuthorityData.Add(GetProperties(reader));
                }

            }
            return AuthorityData;
        }
        public IList<Layer.CompanyChild_Authority> getTableContentByParentId(int parentId, string childName)
        {
            IList<Layer.CompanyChild_Authority> AuthorityData = new List<Layer.CompanyChild_Authority>();
            using (System.Data.IDataReader reader = CommandDataReader("S_CompanyChild_TableContent_GetByParentId", parentId, childName.ToUpper().Trim()))
            {

                while (reader.Read())
                {
                    AuthorityData.Add(GetProperties(reader));
                }

            }
            return AuthorityData;
        }
        public IList<Layer.CompanyChild_Authority> getTableContentByCompanyChildId(int companyChildId)
        {
            IList<Layer.CompanyChild_Authority> AuthorityData = new List<Layer.CompanyChild_Authority>();
            using (System.Data.IDataReader reader = CommandDataReader("S_CompanyChild_TableContent_GetByCompanyChildId", companyChildId))
            {

                while (reader.Read())
                {
                    AuthorityData.Add(GetProperties(reader));
                }

            }
            return AuthorityData;
        }
        public IList<Layer.CompanyChild_Authority> GetByChild(int companyChildId)
        {
            IList<Layer.CompanyChild_Authority> AuthorityList = new List<Layer.CompanyChild_Authority>();
            IList<Layer.CompanyChild_Authority> AuthorityData = new List<Layer.CompanyChild_Authority>();
            IList<Layer.CompanyChild_AuthorityType> AuthorityTypeList = new CompanyChild_AuthorityTypeAccess().GetAll();

            try
            {
                using (System.Data.IDataReader reader = CommandDataReader("S_CompanyChild_Authority"
                     , 0, 0
                            , @companyChildId
                             , 0
                             , ""
                             , "1900/01/01"
                             , "1900/01/01"
                             ,0
                             ))
                {
                    while (reader.Read())
                    {
                        AuthorityData.Add(GetProperties(reader));
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString());
            }

            //Layer.CompanyChild_Authority childAuty = new Layer.CompanyChild_Authority();

            foreach (Layer.CompanyChild_AuthorityType auty in AuthorityTypeList)
            {
                var childAuty = AuthorityData.Where(x => x.AuthorityTypeId == auty.Id).SingleOrDefault();

                AuthorityList.Add(new Layer.CompanyChild_Authority
                {
                    AuthorityTypeId = auty.Id,
                    AuthorityType = auty.AuthorityType,
                    HasCheck = childAuty != null ? true : false,
                    Description = childAuty != null ? childAuty.Description : "",
                    FromDate = childAuty != null ? childAuty.FromDate : new DateTime(1900, 1, 1),
                    ToDate = childAuty != null ? childAuty.ToDate : new DateTime(1900, 1, 1),
                    TableContentOrder = childAuty != null ? childAuty.TableContentOrder : "",
                });
            }

            return AuthorityList;
        }
        public IList<Layer.CompanyChild_Authority> GetByCompanyId(int companyId, int parentId)
        {
            IList<Layer.CompanyChild_Authority> AuthorityList = new List<Layer.CompanyChild_Authority>();
    

            try
            {
                using (System.Data.IDataReader reader = CommandDataReader("S_CompanyChild_Authority_GetByCompanyId"
                     , companyId, parentId

                             ))
                {
                    while (reader.Read())
                    {
                        AuthorityList.Add(GetProperties(reader));
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString());
            }


            return AuthorityList;
        }
        public int Add(Layer.CompanyChild_Authority companyChild_Authority)
        {
            int re = 0;
            try
            {
                re = CommandStore32("S_CompanyChild_Authority"
                    , 1, companyChild_Authority.Id
                           , companyChild_Authority.CompanyChildId
                            , companyChild_Authority.AuthorityTypeId
                            , companyChild_Authority.Description
                            , companyChild_Authority.FromDate
                            , companyChild_Authority.ToDate
                            , companyChild_Authority.Year
                            );
            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString());
            }

            return re;
        }

        public int Update(Layer.CompanyChild_Authority companyChild_Authority)
        {
            int re = 0;
            try
            {
                re = CommandStore32("S_CompanyChild_Authority"
                    , 2, companyChild_Authority.Id
                           , companyChild_Authority.CompanyChildId
                            , companyChild_Authority.AuthorityTypeId
                            , companyChild_Authority.Description
                            , companyChild_Authority.FromDate
                            , companyChild_Authority.ToDate
                            , companyChild_Authority.Year
                            , 0

                            );
            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString());
            }

            return re;
        }
        public int Delete(int companyChildId)
        {
            int re = 0;
            try
            {
                re = CommandStore32("S_CompanyChild_Authority"
                    , 4, 0
                           , companyChildId
                            , 0
                            , ""
                            , "1900/01/01"
                            , "1900/01/01"
                            , 0

                            );
            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString());
            }

            return re;
        }
        private Web.Portal.Layer.CompanyChild_Authority GetProperties(System.Data.IDataReader reader)
        {
            Web.Portal.Layer.CompanyChild_Authority objAuthority = new Web.Portal.Layer.CompanyChild_Authority();
            objAuthority.Id = Convert.ToInt32(GetValueField(reader, "Id", 0));
            objAuthority.CompanyChildId = Convert.ToInt32(GetValueField(reader, "CompanyChildId", string.Empty));
            objAuthority.AuthorityTypeId = Convert.ToInt32(GetValueField(reader, "AuthorityTypeId", string.Empty));
            objAuthority.AuthorityType = Convert.ToString(GetValueField(reader, "AuthorityType", string.Empty)).Trim();
            objAuthority.Description = Convert.ToString(GetValueField(reader, "Description", string.Empty)).Trim();
            objAuthority.FromDate = Convert.ToDateTime(GetValueField(reader, "FromDate", string.Empty));
            objAuthority.ToDate = Convert.ToDateTime(GetValueField(reader, "ToDate", string.Empty));
            objAuthority.TrangThai = Convert.ToString(GetValueField(reader, "TrangThai", string.Empty)).Trim();
            objAuthority.TableContentOrder = Convert.ToString(GetValueField(reader, "TableContentOrder", string.Empty)).Trim();

            return objAuthority;
        }
    }
}