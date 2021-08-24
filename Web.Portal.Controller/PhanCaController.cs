using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Portal.Common.ViewModel;
using Web.Portal.Common;
using Web.Portal.Service;
using Web.Portal.Model.Models;
using Web.Portal.DataAccess;
using System.Text;
using Web.Portal.Upload;

namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KTN")]
    public class PhanCaController : BaseController
    {
        ItblMissionService _missionService;
        public PhanCaController(ItblMissionService missionService)
        {
            this._missionService = missionService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List()
        {
            DateTime? DateCreated = Web.Portal.Utils.Format.ConvertDate(Request["date"]);
            string location = Request["location"].Trim();
            int group = int.Parse(Request["group"].Trim());
            List<tblMission> listMission = _missionService.GetByDate(DateCreated.Value,location,group).ToList();
            ViewData["ListPhanCa"] = listMission;
            return View();
        }
        public ActionResult Delete(int id)
        {
            string message = string.Empty;
            string messageType = Utils.DisplayMessage.TypeSuccess;
            _missionService.Delete(id);
            _missionService.Save();
            message = "Đã xóa thông tin thành công!";
            return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Edit(int? id)
        {
            var mission = new tblMission();
            if (id.HasValue && id.Value != 0)
                mission = _missionService.GetByID(id.Value);
            return View(mission);
        }
        public ActionResult Action(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                var mission = new tblMission();
                if (keyValue != 0)
                {
                    mission = _missionService.GetByID(keyValue);
                }
                mission.MissionName = Utils.Format.GetNullString(formRequest["mission"]).ToUpper();
                mission.StaffName = Utils.Format.GetNullString(formRequest["staff"]);
                mission.CaLV = Utils.Format.GetNullString(formRequest["ca"]);
                mission.Location = Utils.Format.GetNullString(formRequest["location"]);
                if (keyValue == 0)
                {
                    _missionService.Add(mission);
                    _missionService.Save();
                    message = "Đã thêm mới bản ghi thành công!";
                }
                else
                {
                    _missionService.Update(mission);
                    _missionService.Save();
                    message = "Đã sửa thông tin thành công!";
                }
                //return Json(new
                //{
                //    Type = "success",
                //    Message = message,
                //    Title = "Thông báo",
                //    Error = "OK",
                //    Func = "hermesAction.downloadInvoice(" + 6 + ")"
                //}, JsonRequestBehavior.AllowGet);
                   return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string message = "Lỗi";
                string messageType = Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Import(int id)
        {
            ViewBag.ID = id;
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
                string message = ActionExcel(Server.MapPath(DisplayUrl.UrlUploadFile + fileImport), groupid);

                string messageType = message.Equals("OK") ? Utils.DisplayMessage.TypeSuccess : Utils.DisplayMessage.TypeError;
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Utils.DisplayMessage.TypeError, Message = ex.StackTrace, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        private string ActionExcel(string fileName, int groupID)
        {
            string connectionExcel = string.Format(System.Configuration.ConfigurationManager.ConnectionStrings[(fileName.LastIndexOf(".xlsx") == -1 ? "CNSEXCEL03" : "CNSEXCEL07")].ToString(), fileName);
            try
            {

                System.Data.OleDb.OleDbConnection connExcel = new System.Data.OleDb.OleDbConnection(connectionExcel);
                System.Data.OleDb.OleDbCommand cmdExcel = new System.Data.OleDb.OleDbCommand();
                connExcel.Open();
                tblMission mission = new tblMission();
                System.Data.DataTable dataTable = connExcel.GetOleDbSchemaTable(System.Data.OleDb.OleDbSchemaGuid.Tables, null);
                System.Text.StringBuilder messageError = new StringBuilder();

                foreach (System.Data.DataRow dataRows in dataTable.Rows)
                {
                    if (dataRows["TABLE_NAME"].ToString().ToUpper().Trim().Equals("PHANCA$"))
                    {
                        string query = "SELECT * FROM [" + dataRows["TABLE_NAME"] + "]";
                        cmdExcel = new System.Data.OleDb.OleDbCommand(query, connExcel);
                        System.Data.OleDb.OleDbDataReader reader = cmdExcel.ExecuteReader();
                        //new MissionAccess().Delete(groupID);
                        while (reader.Read())
                        {
                            if (!string.IsNullOrEmpty(reader[0].ToString().Trim()))
                                _missionService.Add(new tblMission
                                {
                                    GroupID = groupID,
                                    GroupName = "",
                                    MissionName = reader[3].ToString().Trim(),
                                    StaffName = reader[1].ToString().Trim(),
                                    CaLV = reader[2].ToString().Trim(),
                                    Location = reader[0].ToString().Trim(),
                                    Note = reader[4].ToString().Trim(),
                                    Created = DateTime.Now
                                });
                        }
                        _missionService.Save();
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
