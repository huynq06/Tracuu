using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Web.Portal.Sercurity
{
    public class MemberController : SercurityController
    {
        Web.Portal.Sercurity.MemberAccess memberContext = new MemberAccess();
        public ActionResult Index()
        {
            ViewData["MemberList"] = memberContext.GetAll();
            return View();
        }
        public ActionResult Register(int? id, string uid)
        {
            Web.Portal.Sercurity.Member member = id.HasValue && id.Value != 0 ? memberContext.GetByID(id.Value) : new Web.Portal.Sercurity.Member();
            var roles = (WebMatrix.WebData.SimpleRoleProvider)System.Web.Security.Roles.Provider;
            if (member.MemberId != 0)
                ViewData["RoleUser"] = roles.GetRolesForUser(member.UserName);

            ViewData["RoleList"] = roles.GetAllRoles();
            ViewData["OrganizationList"] = new OrganizationAccess().GetAll();


            return View(member);
        }
        public ActionResult RegisterCDT(int? id)
        {
            Web.Portal.Sercurity.Member member = id.HasValue && id.Value != 0 ? memberContext.GetByID(id.Value) : new Web.Portal.Sercurity.Member();
            var roles = (WebMatrix.WebData.SimpleRoleProvider)System.Web.Security.Roles.Provider;
            if (member.MemberId != 0)
                ViewData["RoleUser"] = roles.GetRolesForUser(member.UserName);

            ViewData["RoleList"] = roles.GetAllRoles();



            return View(member);
        }
        public ActionResult ListMember()
        {
            ViewData["ListMember"] = memberContext.GetAll().Where(x => x.Deleted == false).ToList();
            return View();
        }


        [ValidateInput(false)]
        public ActionResult Action(FormCollection formRequest)
        {
            try
            {

                int memberId = string.IsNullOrEmpty(formRequest["memberId"]) ? 0 : Convert.ToInt32(formRequest["memberId"]);
                Web.Portal.Sercurity.Member objMember = memberId == 0 ? new Member() : memberContext.GetByID(memberId);

                if ((memberId == 0 && WebMatrix.WebData.WebSecurity.UserExists(formRequest["userName"]) == true)
                    || (memberId != 0 && !objMember.UserName.Trim().ToUpper().Equals(formRequest["userName"].Trim().ToUpper()) &&
                      WebMatrix.WebData.WebSecurity.UserExists(formRequest["userName"]) == true)
                    )
                    return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeWarning, Message = "Tên đăng nhập này đã tồn tại.Vui lòng nhập tên khác!", Title = "Thông báo" }, JsonRequestBehavior.AllowGet);





                var roles = (WebMatrix.WebData.SimpleRoleProvider)System.Web.Security.Roles.Provider;
                if (memberId == 0 && WebMatrix.WebData.WebSecurity.UserExists(formRequest["userName"]) == false)
                    WebMatrix.WebData.WebSecurity.CreateUserAndAccount(formRequest["userName"].Trim(), formRequest["password"], requireConfirmationToken: false);


                if (memberId != 0)
                {
                    if (!objMember.UserName.Trim().ToUpper().Equals(formRequest["userName"].Trim().ToUpper()))
                    {
                        DeleteUser(objMember.UserName);
                        WebMatrix.WebData.WebSecurity.CreateUserAndAccount(formRequest["userName"].Trim(), formRequest["password"], requireConfirmationToken: false);
                    }
                    else
                    {

                        string[] roleUsers = roles.GetRolesForUser(formRequest["userName"].Trim());
                        if (roleUsers != null)
                            roles.RemoveUsersFromRoles(new string[] { formRequest["userName"].Trim() }, roleUsers);
                        if (!string.IsNullOrEmpty(Request["password"]))
                        {
                            string token = WebMatrix.WebData.WebSecurity.GeneratePasswordResetToken(formRequest["userName"]);
                            WebMatrix.WebData.WebSecurity.ResetPassword(token, formRequest["password"]);
                        }
                    }

                }
                if (!string.IsNullOrEmpty(formRequest["userRoles"]))
                    roles.AddUsersToRoles(new string[] { formRequest["userName"] }, formRequest["userRoles"].Trim().Split(','));




                int UserId = WebMatrix.WebData.WebSecurity.GetUserId(formRequest["userName"]);
                objMember.UserName = formRequest["userName"].Trim();
                objMember.FullName = formRequest["fullName"].Trim();
                objMember.Email = formRequest["email"].Trim();
                objMember.Code = formRequest["code"].Trim();
                objMember.GroupId = Convert.ToInt32(formRequest["groupId"]);
                objMember.Rank = formRequest["rank"].Trim();
                objMember.Active = Convert.ToBoolean(formRequest["active"]);

                objMember.UserId = UserId;
                objMember.Deleted = false;



                if (!string.IsNullOrEmpty(formRequest["fileAvatarattach"]))
                {
                    System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                    List<Web.Portal.Upload.FileTem> fileJsonUpload = oSerializer.Deserialize<List<Web.Portal.Upload.FileTem>>(formRequest["fileAvatarattach"]);
                    foreach (var item in fileJsonUpload)
                        objMember.Avatar = item.key;

                }
                string message = string.Empty;

                if (objMember.MemberId == 0)
                {

                    memberContext.Add(objMember);
                    message = "Đã thêm mới thông tin thành viên thành công!";

                }
                else
                {
                    memberContext.Update(objMember);
                    message = "Đã sửa thông tin thành viên thành công!";

                }




                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeSuccess, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (System.Web.Security.MembershipCreateUserException ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.StackTrace, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }




        }
        private bool DeleteUser(string userName)
        {
            try
            {
                var roles = (WebMatrix.WebData.SimpleRoleProvider)System.Web.Security.Roles.Provider;
                roles.RemoveUsersFromRoles(new string[] { userName }, roles.GetRolesForUser(userName));
                var memberShip = (WebMatrix.WebData.SimpleMembershipProvider)System.Web.Security.Membership.Provider;
                return memberShip.DeleteUser(userName, false);

            }
            catch (Exception)
            {

            }
            return false;
        }
        public ActionResult Delete(int? id)
        {
            try
            {

                string message = "Đã xóa thông tin thành viên";
                if (id.HasValue)
                {

                    Web.Portal.Sercurity.Member member = memberContext.GetByID(id.Value);

                    //member.Deleted = true;
                    memberContext.Delete(id.Value);
                    //memberContext.Update(member);
                    //memberContext.Delete(member.MemberId)

                    DeleteUser(member.UserName);





                }
                else
                {
                    message = "Chưa có thông tin thành viên";
                }

                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeSuccess, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (System.Web.Security.MembershipCreateUserException ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.Message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }





    }
}
