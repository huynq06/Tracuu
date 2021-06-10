using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Sercurity
{
    public class MemberAccess : Web.Portal.DataBase.DataProvider
    {
        private string SQL_SELECT = "select MemberId,UserId,UserName,Code,FullName,Email,GroupId,Avatar,Active,Deleted,Created,Modified from Member";
        public int Add(Web.Portal.Sercurity.Member objMember)
        {
            return CommandStore32("Member_Add", objMember.UserId,
                                            objMember.UserName,
                                            objMember.Code,
                                            objMember.FullName,
                                            objMember.Email,                                           
                                            objMember.GroupId,
                                            objMember.Avatar,
                                            objMember.Active, objMember.Deleted, DateTime.Now);
        }
        public int Update(Web.Portal.Sercurity.Member objMember)
        {
            return CommandStore32("Member_Update", objMember.MemberId,
                                                    objMember.UserId,
                                                    objMember.UserName,
                                                    objMember.Code,
                                                    objMember.FullName,
                                                    objMember.Email,
                                                    
                                                    objMember.GroupId,
                                                    objMember.Avatar,
                                                    objMember.Active,
                                                    objMember.Deleted,
                                                    DateTime.Now);
        }
        public int Delete(int MemberId)
        {
            return CommandScriptReturn(string.Format("delete from Member where MemberId={0};select @@ROWCOUNT;", MemberId));
        }
        private Web.Portal.Sercurity.Member GetProperties(System.Data.IDataReader reader)
        {
            Web.Portal.Sercurity.Member objMember = new Web.Portal.Sercurity.Member();
            objMember.MemberId = Convert.ToInt32(GetValueField(reader, "MemberId", 0));
            objMember.UserId = Convert.ToInt32(GetValueField(reader, "UserId", 0));
            objMember.UserName = Convert.ToString(GetValueField(reader, "UserName", string.Empty));
            objMember.Code = Convert.ToString(GetValueField(reader, "Code", string.Empty));
            objMember.FullName = Convert.ToString(GetValueField(reader, "FullName", string.Empty));
            objMember.GroupId = Convert.ToInt32(GetValueField(reader, "GroupId", 0));
            objMember.Avatar = Convert.ToString(GetValueField(reader, "Avatar", string.Empty));
          
            objMember.Email = Convert.ToString(GetValueField(reader, "Email", string.Empty));
            objMember.Active = Convert.ToBoolean(GetValueField(reader, "Active", false));
            objMember.Deleted = Convert.ToBoolean(GetValueField(reader, "Deleted", false));
            objMember.Created = GetValueDateTimeField(reader, "Created", objMember.Created);
            objMember.Modified = GetValueDateTimeField(reader, "Modified", objMember.Modified);
            return objMember;
        }


        public Web.Portal.Sercurity.Member GetByID(int MemberId)
        {
            using (System.Data.IDataReader reader = CommandScriptDataReader(string.Format(SQL_SELECT + " where MemberId={0}", MemberId)))
            {

                if (reader.Read())
                    return GetProperties(reader);

            }
            return new Web.Portal.Sercurity.Member();
        }

        public Web.Portal.Sercurity.Member GetByUserID(int userId)
        {
            using (System.Data.IDataReader reader = CommandScriptDataReader(string.Format(SQL_SELECT + " where userId={0}", userId)))
            {

                if (reader.Read())
                    return GetProperties(reader);

            }
            return new Web.Portal.Sercurity.Member();
        }
        public IList<Web.Portal.Sercurity.Member> GetAll()
        {
            IList<Web.Portal.Sercurity.Member> MemberList = new List<Web.Portal.Sercurity.Member>();
            using (System.Data.IDataReader reader = CommandScriptDataReader(SQL_SELECT + " order by FullName"))
            {

                while (reader.Read())
                    MemberList.Add(GetProperties(reader));

            }
            return MemberList;
        }
    }
}