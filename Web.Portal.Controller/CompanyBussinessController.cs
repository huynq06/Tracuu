using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web.Mvc;

namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KTN,XEMUYQUYEN")]
    public class CompanyBussinessController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult List()
        {
            string code = string.IsNullOrEmpty(Request["code"]) ? string.Empty : Request["code"].Trim();
            string name = string.IsNullOrEmpty(Request["name"]) ? string.Empty : Request["name"].Trim();

            string nameChild = string.IsNullOrEmpty(Request["namechild"]) ? string.Empty : Request["namechild"].Trim();
            string idno = string.IsNullOrEmpty(Request["idno"]) ? string.Empty : Request["idno"].Trim();
            int year = string.IsNullOrEmpty(Request["year"]) ? DateTime.Now.Year : Convert.ToInt32(Request["year"]);
            name = name.Replace("CCCCCCCCC", "&");
            nameChild = nameChild.Replace("CCCCCCCCC", "&");
            idno = idno.Replace("CCCCCCCCC", "&");
            code = code.Replace("CCCCCCCCC", "&");
            IList<Layer.CompanyBussiness> companyBussinessList = new DataAccess.CompanyBussinessAccess().GetPaging(year, code, name, nameChild, idno);
            IList<Layer.CompanyChild> companyChildList = new DataAccess.CompanyChildAccess().GetPaging(year, code, name, nameChild, idno);
            List<Layer.CompanyBussiness> companyBSReal = new List<Layer.CompanyBussiness>();
            //List<Layer.CompanyChild> companyChildReal = new List<Layer.CompanyChild>();

            var childs = companyBussinessList.Where(x => (string.IsNullOrEmpty(nameChild) || x.Name.ToUpper().Contains(nameChild.ToUpper())) && (string.IsNullOrEmpty(idno) || x.IdNo.ToUpper().Contains(idno.ToUpper())) && x.ParentId != 0).ToList();
            int[] arrayChild = childs.Select(x => x.ParentId).ToArray();
            var parents = companyBussinessList.Where(x => (string.IsNullOrEmpty(name) || x.Name.ToUpper().Contains(name.ToUpper())) && ((!string.IsNullOrEmpty(nameChild) || !string.IsNullOrEmpty(idno)) && Array.Exists(arrayChild, k => k == x.CompanyId) || (string.IsNullOrEmpty(nameChild) && string.IsNullOrEmpty(idno)))).ToList();
            companyBSReal.AddRange(parents);
            foreach (var item in childs)
                if (companyBSReal.Count(x => x.CompanyId == item.CompanyId && x.ParentId == item.ParentId) == 0 && parents.Count(x => x.CompanyId == item.ParentId) > 0)
                    companyBSReal.Add(item);
            ViewData["CompanyBussinessList"] = companyBSReal;
            ViewData["CompanyChildList"] = companyChildList;
            return View();
        }

        public ActionResult ListUQ(int? id)
        {
            IList<Layer.CompanyBussiness> companyBussinessList = new DataAccess.CompanyBussinessAccess().GetByParent(id.Value);

            ViewData["CompanyBussinessList"] = companyBussinessList;

            return View();
        }

        public ActionResult GetComapny(int id)
        {
            StringBuilder row = new StringBuilder();

            row.AppendLine("<option value='0'>Có thể chọn bên ủy quyền</option>");
            IList<Layer.CompanyBussiness> CompanyBussinessList = new DataAccess.CompanyBussinessAccess().SearchBy(id, string.Empty); ;
            foreach (var item in CompanyBussinessList)
            {
                row.AppendLine("<option value='" + item.CompanyId + "'>" + item.Name + "</option>");
            }
            return Content(row.ToString());
        }

        public ActionResult Edit(int? id)
        {
            Web.Portal.Layer.CompanyBussiness companyBussiness = new Layer.CompanyBussiness();
            if (id.HasValue)
                companyBussiness = new DataAccess.CompanyBussinessAccess().GetByID(id.Value);
            else
            {
                companyBussiness.Code = new DataAccess.CompanyBussinessAccess().GenCode();
                companyBussiness.Year = Convert.ToInt32(Request["year"]);
            }

            ViewData["CompanyBussinessList"] = new DataAccess.CompanyBussinessAccess().SearchBy(companyBussiness.Year, string.Empty);
            ViewData["CompanyChild_AuthorityTypeList"] = new DataAccess.CompanyChild_AuthorityTypeAccess().GetAll();

            return View(companyBussiness);
        }

        public JsonResult GetCode()
        {
            return Json(new { MaUyQuyen = new DataAccess.CompanyBussinessAccess().GenCode() }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMaMucLucByName(string parentName, string childName, int year)
        {
            return Json(new { data = new DataAccess.CompanyChild_AuthorityAccess().getTableContentByName(parentName, childName, year) }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMaMucLucByParentId(int parentId, string childName)
        {
            return Json(new { data = new DataAccess.CompanyChild_AuthorityAccess().getTableContentByParentId(parentId, childName) }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMaMucLucByCompanyChildId(int companyChildId)
        {
            return Json(new { data = new DataAccess.CompanyChild_AuthorityAccess().getTableContentByCompanyChildId(companyChildId) }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult EditMain(int? id)
        {
            Web.Portal.Layer.CompanyBussiness companyBussiness = new Layer.CompanyBussiness();
            if (id.HasValue)
                companyBussiness = new DataAccess.CompanyBussinessAccess().GetByID(id.Value);

            return View(companyBussiness);
        }

        public ActionResult EditChild(int? id)
        {
            Web.Portal.Layer.CompanyBussiness companyBussiness = new Layer.CompanyBussiness();
            int parentId = string.IsNullOrEmpty(Request["parent"]) ? 0 : Convert.ToInt32(Request["parent"]);
            Web.Portal.Layer.CompanyChild companyChild = new Layer.CompanyChild();
            IList<Layer.CompanyChild_Authority> companyChild_Authority = new List<Layer.CompanyChild_Authority>();
            if (id.HasValue)
            {
                companyBussiness = new DataAccess.CompanyBussinessAccess().GetByID(id.Value);
                companyChild = new DataAccess.CompanyChildAccess().GetByID(id.Value, parentId, companyBussiness.Year);
                companyChild_Authority = new DataAccess.CompanyChild_AuthorityAccess().GetByChild(companyChild.CompanyChildId);
            }
            ViewBag.ParentId = parentId;
            ViewData["companyChild"] = companyChild;
            ViewData["CompanyChild_AuthorityList"] = companyChild_Authority;
            ViewBag.CMD = string.IsNullOrEmpty(Request["cmd"]) ? "ADD" : Request["cmd"].Trim();
            Web.Portal.Layer.CompanyBussiness companyBussinessParent = new DataAccess.CompanyBussinessAccess().GetByID(parentId);
            ViewData["CompanyBussinessList"] = new DataAccess.CompanyBussinessAccess().SearchBy(companyBussinessParent.Year, string.Empty).Where(x => x.CompanyId != parentId).ToList();
            return View(companyBussiness);
        }

        [ValidateInput(false)]
        public ActionResult Action(FormCollection formRequest)
        {
            try
            {
                if (HttpContext.User.IsInRole("ADMIN") == false && HttpContext.User.IsInRole("KHAITHAC") == false)
                    return Json(new { Type = Utils.DisplayMessage.TypeError, Message = "Bạn không có quyền truy cập chức năng này", Title = "Thông báo" }, JsonRequestBehavior.AllowGet);

                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                Web.Portal.Layer.CompanyBussiness companyBussiness = new Layer.CompanyBussiness();
                DataAccess.CompanyBussinessAccess CompanyBussinessAccess = new DataAccess.CompanyBussinessAccess();
                string cmd = Request["CMD"];
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                companyBussiness = CompanyBussinessAccess.GetByID(keyValue);
                companyBussiness.Code = formRequest["Code"].Trim();
                companyBussiness.Name = formRequest["Name"].Trim();
                companyBussiness.Address = formRequest["Address"].Trim();
                companyBussiness.IdNo = string.Empty;
                companyBussiness.Year = Utils.Format.GetNullInteger(formRequest["Year"]);
                companyBussiness.Created = DateTime.Now;
                companyBussiness.CreatedName = memberCurrent.FullName;

                if (keyValue == 0)
                {
                    companyBussiness.CompanyId = CompanyBussinessAccess.Add(companyBussiness);
                    message = "Đã thêm mới dữ liệu thành công";
                }
                else
                {
                    CompanyBussinessAccess.Update(companyBussiness);
                    message = "Đã sửa đổi dữ liệu thành công";
                }
                int childId = AddChild(formRequest, companyBussiness, companyBussiness.CompanyId);
                UploadFile(formRequest["fileAlbumattach"], childId, "PARENT");
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.StackTrace, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }

        [ValidateInput(false)]
        public ActionResult ActionMain(FormCollection formRequest)
        {
            try
            {
                if (HttpContext.User.IsInRole("ADMIN") == false && HttpContext.User.IsInRole("KHAITHAC") == false)
                    return Json(new { Type = Utils.DisplayMessage.TypeError, Message = "Bạn không có quyền truy cập chức năng này", Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                Web.Portal.Layer.CompanyBussiness companyBussiness = new Layer.CompanyBussiness();
                DataAccess.CompanyBussinessAccess CompanyBussinessAccess = new DataAccess.CompanyBussinessAccess();
                string cmd = Request["CMD"];
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                companyBussiness = CompanyBussinessAccess.GetByID(keyValue);
                companyBussiness.Code = formRequest["Code"].Trim();
                companyBussiness.Name = formRequest["Name"].Trim();
                companyBussiness.Address = formRequest["Address"].Trim();
                companyBussiness.Year = Utils.Format.GetNullInteger(formRequest["Year"]);
                companyBussiness.Created = DateTime.Now;
                companyBussiness.CreatedName = memberCurrent.FullName;

                CompanyBussinessAccess.Update(companyBussiness);
                message = "Đã sửa đổi dữ liệu thành công";

                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.StackTrace, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }

        private int AddChild(FormCollection formRequest, Layer.CompanyBussiness companyBussiness, int parentId)
        {
            DataAccess.CompanyBussinessAccess CompanyBussinessAccess = new DataAccess.CompanyBussinessAccess();
            Web.Portal.Layer.CompanyBussiness companyBussinessChild = new Layer.CompanyBussiness();

            int companyChildId = string.IsNullOrEmpty(Request["SelectChild"]) ? 0 : Convert.ToInt32(Request["SelectChild"]);
            if (companyChildId == 0)
            {
                companyBussinessChild.Code = CompanyBussinessAccess.GenCode();
                companyBussinessChild.Name = formRequest["ChildName"].Trim();
                companyBussinessChild.Address = formRequest["ChildAddress"].Trim();
                companyBussinessChild.IdNo = formRequest["IdNo"].Trim();
                companyBussinessChild.Year = companyBussiness.Year;
                companyBussinessChild.Created = DateTime.Now;
                companyBussinessChild.CreatedName = memberCurrent.FullName;
                companyChildId = CompanyBussinessAccess.Add(companyBussinessChild);
            }

            Web.Portal.Layer.CompanyChild companyChild = new Layer.CompanyChild();
            companyChild.CompanyId = companyChildId;
            companyChild.ParentId = parentId;
            companyChild.TypeDoc = formRequest["TypeDoc"].Trim();
            companyChild.Description = formRequest["Description"].Trim();
            companyChild.Year = companyBussiness.Year;
            companyChild.Created = DateTime.Now;
            companyChild.CreatedName = memberCurrent.FullName;
            int childId = new DataAccess.CompanyChildAccess().Add(companyChild);
            // start add tiếp vào Authen
            // childId là companyChildId
            Layer.CompanyChild_Authority companyChild_Authority = new Layer.CompanyChild_Authority();
            IList<Layer.CompanyChild_AuthorityType> companyChild_AuthorityTypeList = new List<Layer.CompanyChild_AuthorityType>();

            DataAccess.CompanyChild_AuthorityAccess companyChild_AuthorityAccess = new DataAccess.CompanyChild_AuthorityAccess();

            if (!string.IsNullOrEmpty(Request.Form["check_LoaiCongVan"]))
            {
                foreach (string AutTypeId in Request.Form["check_LoaiCongVan"].Split(','))
                {
                    companyChild_AuthorityAccess.Add(new Layer.CompanyChild_Authority
                    {
                        CompanyChildId = childId,
                        AuthorityTypeId = int.Parse(AutTypeId),
                        Description = formRequest["noiDung_" + AutTypeId].Trim(),
                        FromDate = Utils.Format.ConvertDate(formRequest["tuNgay_" + AutTypeId].Trim()).Value,
                        ToDate = Utils.Format.ConvertDate(formRequest["denNgay_" + AutTypeId].Trim()).Value,

                      

                        Year = companyBussiness.Year,

                    });
                }
            }

            // end add tiếp vào Authen

            return childId;
        }

        [ValidateInput(false)]
        public ActionResult ActionChild(FormCollection formRequest)
        {
            try
            {
                if (HttpContext.User.IsInRole("ADMIN") == false && HttpContext.User.IsInRole("KHAITHAC") == false)
                    return Json(new { Type = Utils.DisplayMessage.TypeError, Message = "Bạn không có quyền truy cập chức năng này", Title = "Thông báo" }, JsonRequestBehavior.AllowGet);

                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;

                string cmd = Request["CMD"];
                int keyValue = string.IsNullOrEmpty(formRequest["keyValue"]) ? 0 : Convert.ToInt32(formRequest["keyValue"]);
                int parentId = string.IsNullOrEmpty(formRequest["parentId"]) ? 0 : Convert.ToInt32(formRequest["parentId"]);
                int companyChildId = string.IsNullOrEmpty(formRequest["cmdChildId"]) ? 0 : Convert.ToInt32(formRequest["cmdChildId"]);
                DataAccess.CompanyBussinessAccess companyBussinessAccess = new DataAccess.CompanyBussinessAccess();
                DataAccess.CompanyChildAccess companyChildAccess = new DataAccess.CompanyChildAccess();

                int ChildId = 0;
                if (cmd.Equals("ADD"))
                {
                    Layer.CompanyBussiness companyBussiness = companyBussinessAccess.GetByID(parentId);
                    ChildId = AddChild(formRequest, companyBussiness, parentId);
                    message = "Đã thêm mới dữ liệu thành công!";
                }
                else
                {
                    Layer.CompanyBussiness companyBussiness = companyBussinessAccess.GetByID(keyValue);
                    companyBussiness.Name = formRequest["ChildName"].Trim();
                    companyBussiness.Address = formRequest["ChildAddress"].Trim();
                    companyBussiness.IdNo = formRequest["IdNo"].Trim();
                    companyBussiness.Year = companyBussiness.Year;
                    companyBussiness.Created = DateTime.Now;
                    companyBussiness.CreatedName = memberCurrent.FullName;
                    companyBussinessAccess.Update(companyBussiness);
                    Web.Portal.Layer.CompanyChild companyChild = companyChildAccess.GetByID(companyChildId);

                    companyChild.TypeDoc = formRequest["TypeDoc"].Trim();
                    companyChild.Description = formRequest["Description"].Trim();
                    companyChild.Year = companyBussiness.Year;
                    companyChild.Created = DateTime.Now;
                    companyChild.CreatedName = memberCurrent.FullName;
                    companyChildAccess.Update(companyChild);

                    ChildId = companyChild.CompanyChildId;

                    // start add tiếp vào Authen
                    // childId là companyChildId
                    Layer.CompanyChild_Authority companyChild_Authority = new Layer.CompanyChild_Authority();
                    DataAccess.CompanyChild_AuthorityAccess companyChild_AuthorityAccess = new DataAccess.CompanyChild_AuthorityAccess();
                    // xóa hết những value cũ
                    companyChild_AuthorityAccess.Delete(ChildId);

                    // thêm mới lại
                    if (!string.IsNullOrEmpty(Request.Form["check_LoaiCongVan"]))
                    {
                        foreach (string AutTypeId in Request.Form["check_LoaiCongVan"].Split(','))
                        {
                            companyChild_AuthorityAccess.Add(new Layer.CompanyChild_Authority
                            {
                                CompanyChildId = ChildId,
                                AuthorityTypeId = int.Parse(AutTypeId),
                                Description = formRequest["noiDung_" + AutTypeId].Trim(),
                                FromDate = Utils.Format.ConvertDate(formRequest["tuNgay_" + AutTypeId].Trim()).Value,
                                ToDate = Utils.Format.ConvertDate(formRequest["denNgay_" + AutTypeId].Trim()).Value,

                               

                                Year = companyBussiness.Year,

                            });
                        }
                    }

                    // end add tiếp vào Authen
                    message = "Đã sửa đổi dữ liệu thành công";
                }

                UploadFile(formRequest["fileAlbumattach"], ChildId, "CHILD");
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.StackTrace, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Delete(int? id)
        {
            try
            {
                if (HttpContext.User.IsInRole("ADMIN") == false && HttpContext.User.IsInRole("KHAITHAC") == false)
                    return Json(new { Type = Utils.DisplayMessage.TypeError, Message = "Bạn không có quyền truy cập chức năng này", Title = "Thông báo" }, JsonRequestBehavior.AllowGet);

                string message = "Đã xóa dữ liệu thành công!";
                if (id.HasValue)
                {
                    new DataAccess.CompanyBussinessAccess().Delete(id.Value);
                }
                else
                    message = "Vui lòng chọn dữ liệu cần xóa!";

                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeSuccess, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.Message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DeleteChildMap(int? id)
        {
            int parentId = string.IsNullOrEmpty(Request["parent"]) ? 0 : Convert.ToInt32(Request["parent"]);
            try
            {
                if (HttpContext.User.IsInRole("ADMIN") == false && HttpContext.User.IsInRole("KHAITHAC") == false)
                    return Json(new { Type = Utils.DisplayMessage.TypeError, Message = "Bạn không có quyền truy cập chức năng này", Title = "Thông báo" }, JsonRequestBehavior.AllowGet);

                string message = "Đã xóa dữ liệu thành công!";
                if (id.HasValue)
                {
                    new DataAccess.CompanyBussinessAccess().DeleteChildMap(id.Value, parentId);
                }
                else
                    message = "Vui lòng chọn dữ liệu cần xóa!";

                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeSuccess, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.Message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DeleteChild(int? id)
        {
            try
            {
                if (HttpContext.User.IsInRole("ADMIN") == false && HttpContext.User.IsInRole("KHAITHAC") == false)
                    return Json(new { Type = Utils.DisplayMessage.TypeError, Message = "Bạn không có quyền truy cập chức năng này", Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
                string message = "Đã xóa dữ liệu thành công!";
                if (id.HasValue)
                    new DataAccess.CompanyChildAccess().Delete(id.Value);
                else
                    message = "Vui lòng chọn bản ghi cần xóa";

                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeSuccess, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.Message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Attachs(int id)
        {
            List<Web.Portal.Upload.FileTem> fileJsonUpload = new List<Web.Portal.Upload.FileTem>();
            List<string> urlFile = new List<string>();
            string code = string.IsNullOrEmpty(Request["code"]) ? DateTime.Now.Year.ToString() : Request["code"];
            IList<Web.Portal.Layer.AlbumFile> albumFiles = new Web.Portal.DataAccess.AlbumFileAccess().GetAll(id, code.Trim());

            foreach (var item in albumFiles)
            {
                urlFile.Add(Web.Portal.Upload.DisplayIcon.CreateUrlDownload(Web.Portal.Utils.Constants.DOWNLOAD_URL, item.FileServer, item.FileName, item.FileType));
                fileJsonUpload.Add(new Web.Portal.Upload.FileTem
                {
                    type = "html",
                    caption = string.Format(Web.Portal.Utils.Constants.DOWNLOAD_URL, item.FileServer, item.FileName, item.FileName),
                    size = item.FileSize,
                    width = item.FileWith,
                    key = item.FileServer
                });
            }

            return Json(new { initialPreview = urlFile, initialPreviewConfig = fileJsonUpload, append = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ShowAlbum(int id)
        {
            IList<Web.Portal.Layer.AlbumFile> AlbumFiles = new List<Web.Portal.Layer.AlbumFile>();
            AlbumFiles = new DataAccess.AlbumFileAccess().GetAll(id, string.Empty);
            ViewData["ImageList"] = AlbumFiles;
            return View();
        }

        public ActionResult ShowChild(int id)
        {
            IList<Layer.CompanyChild_Authority> authorities = new List<Layer.CompanyChild_Authority>();

            int parentId = Convert.ToInt32(Request["parent"]);
            authorities = new DataAccess.CompanyChild_AuthorityAccess().GetByCompanyId(id, parentId);

            ViewData["CompanyChild_AuthorityList"] = authorities;
            return View();
        }

        public ActionResult MucLucUyQuyen()
        {
            //IList<Web.Portal.Layer.AlbumFile> AlbumFiles = new List<Web.Portal.Layer.AlbumFile>();
            //AlbumFiles = new DataAccess.AlbumFileAccess().GetAll(id, string.Empty);
            //ViewData["ImageList"] = AlbumFiles;
            int year = Convert.ToInt32(Request["year"]);
            int authorityTypeId = Convert.ToInt32(Request["authorityTypeId"]);
            ViewBag.AuthorityType = new DataAccess.CompanyChild_AuthorityTypeAccess().GetById(authorityTypeId).AuthorityType;
            ViewData["CompanyChild_AuthorityTypeList"] = new DataAccess.CompanyChild_AuthorityTypeAccess().GetAll();
            ViewData["CompanyBussiness_TableContent"] = new DataAccess.CompanyBussinessAccess().GetTableContent(year, authorityTypeId);
            return View();
        }

        public JsonResult MucLucUyQuyenJson()
        {
            int year = Convert.ToInt32(Request["year"]);
            int authorityTypeId = Convert.ToInt32(Request["authorityTypeId"]);
            return Json(new DataAccess.CompanyBussinessAccess().GetTableContent(year, authorityTypeId), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBySearch()
        {
            int id = string.IsNullOrEmpty(Request["id"]) ? 0 : Convert.ToInt32(Request["id"]);

            return Json(new DataAccess.CompanyBussinessAccess().GetByID(id), JsonRequestBehavior.AllowGet);
        }

        public ActionResult DeleteFile(string id)
        {
            try
            {
                if (HttpContext.User.IsInRole("ADMIN") == false && HttpContext.User.IsInRole("KHAITHAC") == false)
                    return Json(new { Type = Utils.DisplayMessage.TypeError, Message = "Bạn không có quyền truy cập chức năng này", Title = "Thông báo" }, JsonRequestBehavior.AllowGet);

                string message = "Vui lòng chọn file cần xóa!";

                new Web.Portal.DataAccess.AlbumFileAccess().Delete(id);
                message = "Đã xóa thông tin file thành công!";

                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeSuccess, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.Message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }

        private void UploadFile(string fileAttachs, int Id, string CODE)
        {
            if (!string.IsNullOrEmpty(fileAttachs))
            {
                List<Web.Portal.Upload.FileTem> fileJsonUpload = new List<Upload.FileTem>();

                fileJsonUpload = Web.Portal.Upload.ConvertFileTem.ConvertJsonToList(fileAttachs);
                foreach (var item in fileJsonUpload)
                {
                    new Web.Portal.DataAccess.AlbumFileAccess().Add(new Layer.AlbumFile()
                    {
                        FileName = item.caption,
                        FileServer = item.key,
                        FileSize = item.size,
                        FileWith = item.width,
                        FileType = item.key.Substring(item.key.LastIndexOf(".")).ToUpper(),
                        CODE = CODE,

                        IdMain = Id,

                        Created = DateTime.Now
                    });
                }
            }
        }

        public FileStreamResult DownloadMucLuc()
        {
            int year = Convert.ToInt32(Request["year"]);
            int AuthorityTypeId = Convert.ToInt32(Request["AuthorityTypeId"]);
            string AuthorityType = Request["AuthorityType"].Trim();

            var stream = new DataAccess.CompanyBussinessAccess().GetMucLuc(year, AuthorityTypeId);
            stream.Seek(0, SeekOrigin.Begin);
            var buffer = stream as MemoryStream;
            return new FileStreamResult(buffer, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            {
                FileDownloadName = "MucLuc" + "_" + AuthorityType + "_" + year + ".xlsx"
            };
        }
    }
}