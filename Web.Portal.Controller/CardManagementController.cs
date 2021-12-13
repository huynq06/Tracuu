using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Portal.Common.ViewModel;
using Web.Portal.Common;
using Web.Portal.Service;
using Web.Portal.Model.Models.QLT;
using Web.Portal.DataAccess;
using System.Text;
using Web.Portal.Upload;


namespace Web.Portal.Controller
{
    public class CardManagementController : BaseController
    {
        IUserService _userService;
        IUserCardService _userCardService;
        IOrganizationService _organizationService;
        public CardManagementController(IUserService userService, IUserCardService userCardService, IOrganizationService organizationService)
        {
            this._userService = userService;
            this._userCardService = userCardService;
            this._organizationService = organizationService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult EditAllocation()
        {
            int id = int.Parse(Request["id"].Trim());
            int cardID = int.Parse(Request["cardID"].Trim());
            var user = _userService.GetById(id);
            ViewBag.CardID = cardID.ToString();
            return View(user);
        }
        public ActionResult SaveAllocation(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                int id = Utils.Format.GetNullInteger(formRequest["keyValue"].Trim());
                int cardIndex = Utils.Format.GetNullInteger(formRequest["keyCardValue"].Trim());
                var user = _userService.GetById(id);
                var userCardDb = _userCardService.GetById(cardIndex);
                UserCard userCard = new UserCard();
                userCard.UserCode = user.UserID;
                userCard.UserID = user.ID;
                userCard.UserCardID = Utils.Format.GetNullString(formRequest["des"]).ToUpper();
                userCard.StartDate = Utils.Format.ConvertDate(formRequest["ata"]).Value.Date;
                userCard.ExpiredDate = Utils.Format.ConvertDate(formRequest["ata"]).Value.Date;
                userCard.UserOrder = userCardDb.UserOrder + 1;
                message = "Cấp phát thẻ thành công";
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = ex.ToString(), Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
           
        }
        public ActionResult List()
        {
            int expried = int.Parse(Request["expried"].Trim());

            int stt = int.Parse(Request["stt"].Trim());
            List<User> users = _userService.GetByStatus(stt).ToList();
            List<UserCard> userCards = _userCardService.GetByListUser(users);
            List<UserCardViewModel> listUserCardViewModel = (from user in users
                                                             join userCard in userCards on user.UserID equals userCard.UserCode
                                                             select new UserCardViewModel
                                                             {
                                                                 ID = user.ID,
                                                                 UserID = user.UserID,
                                                                 UserName = user.UserName,
                                                                 Dob = user.Dob,
                                                                 OrganizationID = user.OrganizationID,
                                                                 OrganizationName = user.OrganizationName,
                                                                 Title = user.Title,
                                                                 StartDate = user.StartDate,
                                                                 EndDate = user.EndDate,
                                                                 UserStatus = user.UserStatus,
                                                                 UserActive = user.UserActive,
                                                                 CreatedDate = user.CreatedDate,
                                                                 CMT = user.CMT,
                                                                 SDT = user.SDT,
                                                                 UserCardIndex = userCard.ID,
                                                                 UserCardID = userCard.UserCardID,
                                                                 StartCardDate = userCard.StartDate,
                                                                 ExpiredDate = userCard.ExpiredDate,
                                                                 ColectionDate = userCard.ColectionDate,
                                                             }).ToList();
            if(expried != 1000)
            {
                DateTime dateCheck = DateTime.Now.AddDays(expried);
                listUserCardViewModel = listUserCardViewModel.Where(c => c.ExpiredDate < dateCheck && c.ExpiredDate > DateTime.Now).ToList();
            }
      
            ViewData["ListUserCard"] = listUserCardViewModel;
            return View();
        }
        public ActionResult Import()
        {
            return View();
        }
        public ActionResult ImportFile(FormCollection formRequest)
        {
            try
            {

                string id = Request["fileImportattach"];
                string fileImport = string.Empty;
                string nameFile = string.Empty;

                if (!string.IsNullOrEmpty(id))
                {
                    List<FileTem> fileJsonUpload = new List<FileTem>();

                    fileJsonUpload = ConvertFileTem.ConvertJsonToList(id);
                    foreach (var item in fileJsonUpload)
                    {
                        fileImport = item.key;
                        nameFile = item.caption;
                    }

                }
                int groupid = Utils.Format.GetNullInteger(formRequest["keyValue"]);
                //  string groupName = "checker";
                string message = ActionExcel(Server.MapPath(DisplayUrl.UrlUploadFile + fileImport));

                string messageType = message.Equals("OK") ? Utils.DisplayMessage.TypeSuccess : Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Utils.DisplayMessage.TypeError, Message = ex.StackTrace, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        private string ActionExcel(string fileName)
        {
            string connectionExcel = string.Format(System.Configuration.ConfigurationManager.ConnectionStrings[(fileName.LastIndexOf(".xlsx") == -1 ? "CNSEXCEL03" : "CNSEXCEL07")].ToString(), fileName);
            try
            {

                System.Data.OleDb.OleDbConnection connExcel = new System.Data.OleDb.OleDbConnection(connectionExcel);
                System.Data.OleDb.OleDbCommand cmdExcel = new System.Data.OleDb.OleDbCommand();
                connExcel.Open();
                User user = new User();
                System.Data.DataTable dataTable = connExcel.GetOleDbSchemaTable(System.Data.OleDb.OleDbSchemaGuid.Tables, null);
                System.Text.StringBuilder messageError = new StringBuilder();

                foreach (System.Data.DataRow dataRows in dataTable.Rows)
                {
                    if (dataRows["TABLE_NAME"].ToString().ToUpper().Trim().Equals("QUANLYTHE$"))
                    {
                        string query = "SELECT * FROM [" + dataRows["TABLE_NAME"] + "]";
                        cmdExcel = new System.Data.OleDb.OleDbCommand(query, connExcel);
                        System.Data.OleDb.OleDbDataReader reader = cmdExcel.ExecuteReader();
                        Organization organaization = new Organization();
                        //new MissionAccess().Delete(groupID);
                        while (reader.Read())
                        {
                            DateTime? dt = new DateTime();
                            string endDate = reader[6].ToString().Trim();
                            if (!string.IsNullOrEmpty(reader[0].ToString().Trim()))

                                organaization = _organizationService.GetByName(reader[3].ToString().Trim());
                            _userService.Add(new User
                            {
                                UserID = reader[1].ToString().Trim(),
                                UserName = reader[2].ToString().Trim(),
                                OrganizationID = organaization != null ? organaization.ID : 1,
                                OrganizationName = organaization != null ? organaization.Name : "Hành chính",
                                Title = reader[4].ToString().Trim(),
                                StartDate = Web.Portal.Utils.Format.ConvertDateTimmExcel(reader[5].ToString().Trim()),
                                EndDate = Web.Portal.Utils.Format.ConvertDateTimmExcel(reader[6].ToString().Trim()),
                                UserActive = !string.IsNullOrEmpty(reader[6].ToString().Trim()) ? false : true,


                            });
                            string expredDate = reader[9].ToString().Trim();
                            _userCardService.Add(new UserCard
                            {
                                UserCode = reader[1].ToString().Trim(),
                                StartDate = Web.Portal.Utils.Format.ConvertDateTimmExcel(reader[7].ToString().Trim()),
                                UserCardID = reader[8].ToString().Trim(),
                                ExpiredDate = Web.Portal.Utils.Format.ConvertDateTimmExcel(reader[9].ToString().Trim()),
                                ColectionDate = Web.Portal.Utils.Format.ConvertDateTimmExcel(reader[10].ToString().Trim()),
                                UserOrder = 1,
                            });
                            if(!string.IsNullOrEmpty(reader[11].ToString().Trim()))
                            {
                                _userCardService.Add(new UserCard
                                {
                                    UserCode = reader[1].ToString().Trim(),
                                    StartDate = Web.Portal.Utils.Format.ConvertDateTimmExcel(reader[11].ToString().Trim()),
                                    UserCardID = reader[12].ToString().Trim(),
                                    ExpiredDate = Web.Portal.Utils.Format.ConvertDateTimmExcel(reader[13].ToString().Trim()),
                                    ColectionDate = Web.Portal.Utils.Format.ConvertDateTimmExcel(reader[14].ToString().Trim()),
                                    UserOrder = 2,
                                });
                                if (!string.IsNullOrEmpty(reader[15].ToString().Trim()))
                                {
                                    _userCardService.Add(new UserCard
                                    {
                                        UserCode = reader[1].ToString().Trim(),
                                        StartDate = Web.Portal.Utils.Format.ConvertDateTimmExcel(reader[15].ToString().Trim()),
                                        UserCardID = reader[16].ToString().Trim(),
                                        ExpiredDate = Web.Portal.Utils.Format.ConvertDateTimmExcel(reader[17].ToString().Trim()),
                                        ColectionDate = Web.Portal.Utils.Format.ConvertDateTimmExcel(reader[18].ToString().Trim()),
                                        UserOrder = 3,
                                    });
                                    if (!string.IsNullOrEmpty(reader[19].ToString().Trim()))
                                    {
                                        _userCardService.Add(new UserCard
                                        {
                                            UserCode = reader[1].ToString().Trim(),
                                            StartDate = Web.Portal.Utils.Format.ConvertDateTimmExcel(reader[19].ToString().Trim()),
                                            UserCardID = reader[20].ToString().Trim(),
                                            ExpiredDate = Web.Portal.Utils.Format.ConvertDateTimmExcel(reader[21].ToString().Trim()),
                                            ColectionDate = Web.Portal.Utils.Format.ConvertDateTimmExcel(reader[22].ToString().Trim()),
                                            UserOrder = 4,
                                        });

                                    }

                                }
                            }
                        }
                        _userService.Save();
                        reader.Dispose();
                        return "UPLOAD SUCCESS!";

                    }


                }
          


            }
            catch (Exception ex)
            {
                return connectionExcel + "-" + ex.Message;

            }
            return string.Empty;
        }
    }
}
