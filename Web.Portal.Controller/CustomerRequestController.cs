using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
namespace Web.Portal.Controller
{
    public class CustomerRequestController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ShowAlbum()
        {
            string id = Request["code"];
            string uid = Request["year"];
            IList<Web.Portal.Layer.AlbumFile> AlbumFiles = new List<Web.Portal.Layer.AlbumFile>();
            AlbumFiles = new DataAccess.AlbumFileAccess().GetAll(id, uid.Trim());
            ViewData["ImageList"] = AlbumFiles;
                return View();
        }
        public ActionResult List()
        {
            int total = 0;
            int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            int pageSize = string.IsNullOrEmpty(Request["ps"]) ? Web.Portal.Utils.DisplayMessage.PageSize : Convert.ToInt32(Request["ps"]);

            string code = string.IsNullOrEmpty(Request["code"]) ? string.Empty : Request["code"].Trim();
            string infor = string.IsNullOrEmpty(Request["infor"]) ? string.Empty : Request["infor"].Trim();
            string people = string.IsNullOrEmpty(Request["people"]) ? string.Empty : Request["people"].Trim();
            string idno = string.IsNullOrEmpty(Request["idno"]) ? string.Empty : Request["idno"].Trim();
            string year = string.IsNullOrEmpty(Request["year"]) ? DateTime.Now.Year.ToString() : Convert.ToString(Request["year"]);


            IList<Layer.IMP_CUSTOMER_REQUEST> cargoInouts = new DataAccess.IMP_CUSTOMER_REQUEST_ACCESS().GetPaging(page,
                                                                                  pageSize, year, code, infor, people, idno,
                                                                                  ref total);
            ViewData["ImpCustomerRequestList"] = cargoInouts;
            ViewBag.TotalRecord = total;
            ViewBag.PageCurrent = (page - 1) * pageSize;
            ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingcustomerrq", total, page, pageSize);
            return View();
        }
        [DocumentExport("EXCEL", "DANHSACH_UY_QUYEN")]
        public ActionResult Export()
        {
            int total = 0;
           

            string code = string.IsNullOrEmpty(Request["code"]) ? string.Empty : Request["code"].Trim();
            string infor = string.IsNullOrEmpty(Request["infor"]) ? string.Empty : Request["infor"].Trim();
            string people = string.IsNullOrEmpty(Request["people"]) ? string.Empty : Request["people"].Trim();
            string idno = string.IsNullOrEmpty(Request["idno"]) ? string.Empty : Request["idno"].Trim();
            string year = string.IsNullOrEmpty(Request["year"]) ? DateTime.Now.Year.ToString() : Convert.ToString(Request["year"]);

            IList<Layer.IMP_CUSTOMER_REQUEST> cargoInouts = new DataAccess.IMP_CUSTOMER_REQUEST_ACCESS().GetPaging(1,
                                                                                  Int32.MaxValue, year, code, infor, people, idno,
                                                                                  ref total);
            ViewData["ImpCustomerRequestList"] = cargoInouts;
            ViewBag.TotalRecord = cargoInouts.Count;
            ViewBag.Year = year;
           
            return View();
        }
        public ActionResult EditChild(Int64? id)
        {
            string Code = string.IsNullOrEmpty(Request["code"])?string.Empty: Request["code"].Trim();
            string year= string.IsNullOrEmpty(Request["year"]) ? string.Empty : Request["year"].Trim();
            Web.Portal.Layer.IMP_CUSTOMER_REQUEST IMP_REQUEST = new DataAccess.IMP_CUSTOMER_REQUEST_ACCESS().GetByID(Code.Trim(),year.Trim());

            Web.Portal.Layer.CUSTOMER_DETAILS objCustomerDetails = new Layer.CUSTOMER_DETAILS();
            if (id.HasValue)
                objCustomerDetails = new DataAccess.CUSTOMER_DETAILS_ACCESS().GetByID(id.Value);
            else
            {
                objCustomerDetails.CODE = IMP_REQUEST.CODE;
                objCustomerDetails.YEAR = IMP_REQUEST.YEAR;
            }
            return View(objCustomerDetails);
        }
        public ActionResult ViewChild()
        {
            string year = string.IsNullOrEmpty(Request["year"]) ? DateTime.Now.Year.ToString() : Request["year"];
            string name= string.IsNullOrEmpty(Request["name"]) ? string.Empty : Request["name"];
            IList<Web.Portal.Layer.CUSTOMER_DETAILS> CDList = new DataAccess.CUSTOMER_DETAILS_ACCESS().GetByInfo(name, year);
            ViewData["CUSTOMERDETAILSLIST"] = CDList;
            ViewBag.TotalRecord = CDList.Count;
            return View();
        }
        public ActionResult NextYear()
        {
            return View();
        }
        public ActionResult Edit(string id)
        {
            Web.Portal.Layer.IMP_CUSTOMER_REQUEST imp = new Layer.IMP_CUSTOMER_REQUEST();
            string year = string.IsNullOrEmpty(Request["year"]) ? DateTime.Now.Year.ToString() : Request["year"];
            Web.Portal.DataAccess.IMP_CUSTOMER_REQUEST_ACCESS IMP_CUSTOMER_REQUEST_ACCESS = new Portal.DataAccess.IMP_CUSTOMER_REQUEST_ACCESS();
            if(!string.IsNullOrEmpty(id))            
            imp = IMP_CUSTOMER_REQUEST_ACCESS.GetByID(id.Trim(),year.Trim());
            else
              {
                 imp.YEAR = DateTime.Now.Year.ToString();
                 imp.CODE = IMP_CUSTOMER_REQUEST_ACCESS.GenCode();
              }
            ViewBag.CMD = string.IsNullOrEmpty(Request["cmd"]) ? "ADD" : Request["cmd"];   
            return View(imp);
        }
        [ValidateInput(false)]
        public ActionResult Action(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                Web.Portal.Layer.IMP_CUSTOMER_REQUEST imp = new Layer.IMP_CUSTOMER_REQUEST();
                DataAccess.IMP_CUSTOMER_REQUEST_ACCESS impAccess = new DataAccess.IMP_CUSTOMER_REQUEST_ACCESS();
                string cmd = Request["CMD"];
                imp = impAccess.GetByID(formRequest["keyValue"], formRequest["YEAR"]);
                imp.CODE = formRequest["CODE"].Trim();
                imp.INFOR = formRequest["INFOR"].Trim();
                imp.PEOPLE = formRequest["PEOPLE"].Trim();
                imp.REMARK = formRequest["REMARK"].Trim();
                imp.IDNO = formRequest["IDNO"].Trim();
                imp.YEAR = formRequest["YEAR"];
                imp.CREATED = DateTime.Now;
                imp.USERID = memberCurrent.MemberId;
                if(cmd.Equals("ADD"))
                {
                    impAccess.Add(imp);
                    message = "Đã thêm mới dữ liệu thành công";
                }else
                {
                    impAccess.Update(formRequest["keyValue"].Trim(), imp);
                    message = "Đã sửa đổi dữ liệu thành công";
                }
                UploadFile(formRequest["fileAlbumattach"], imp.CODE, imp.YEAR);
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = "MÃ ỦY QUYỀN ĐÃ TỒN TẠI VUI LÒNG NHẬP MÃ KHÁC", Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        [ValidateInput(false)]
        public ActionResult ActionChild(FormCollection formRequest)
        {
            try
            {
                string message = string.Empty;
                string messageType = Utils.DisplayMessage.TypeSuccess;
                Web.Portal.Layer.CUSTOMER_DETAILS imp = new Layer.CUSTOMER_DETAILS();
                DataAccess.CUSTOMER_DETAILS_ACCESS impAccess = new DataAccess.CUSTOMER_DETAILS_ACCESS();
                imp = impAccess.GetByID(Convert.ToInt64(formRequest["keyValue"]));
                imp.CODE = formRequest["CODE"].Trim();
                imp.INFOR = formRequest["INFOR"].Trim();
               
                imp.REMARK = formRequest["REMARK"].Trim();
                imp.IDNO = formRequest["IDNO"].Trim();
                imp.YEAR = formRequest["YEAR"];
               
                if (imp.ID==0)
                {
                    impAccess.Add(imp);
                    message = "Đã thêm mới dữ liệu thành công";
                }
                else
                {
                    impAccess.Update(imp);
                    message = "Đã sửa đổi dữ liệu thành công";
                }
               
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.Message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Delete(string id)
        {
            try
            {
                string message = "Đã xóa dữ liệu thành công!";
                new DataAccess.IMP_CUSTOMER_REQUEST_ACCESS().Delete(id,Request["year"]);

                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeSuccess, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.Message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult DeleteChild(Int64? id)
        {
            try
            {
                string message = "Đã xóa dữ liệu thành công!";
                if (id.HasValue)
                    new DataAccess.CUSTOMER_DETAILS_ACCESS().Delete(id.Value);
                else
                    message = "Vui lòng chọn bản ghi cần xóa";

                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeSuccess, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.Message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        [ValidateInput(false)]
        public ActionResult NextAction(FormCollection formRequest)
        {
            try
            {
                int from = Convert.ToInt32(formRequest["fr"]);
                int to = Convert.ToInt32(formRequest["to"]);
                string[] code = formRequest["CODE_MULTI"].Split(',');
                string message = "Đã đồng bộ dữ liệu cho năm "+to;
                foreach(var item in code)
                new DataAccess.IMP_CUSTOMER_REQUEST_ACCESS().UpdateYear(from,to,memberCurrent.MemberId,item.Trim());

                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeSuccess, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = ex.Message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Attachs(string id)
        {
            List<Web.Portal.Upload.FileTem> fileJsonUpload = new List<Web.Portal.Upload.FileTem>();
            List<string> urlFile = new List<string>();
            string year = string.IsNullOrEmpty(Request["year"]) ? DateTime.Now.Year.ToString() : Request["year"];
            IList<Web.Portal.Layer.AlbumFile> albumFiles = new Web.Portal.DataAccess.AlbumFileAccess().GetAll(id,year.Trim());
           
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
        public ActionResult DeleteFile(string id)
        {
            try
            {
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
        private void UploadFile(string fileAttachs, string CODE,string YEAR)
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
                        YEAR=YEAR,

                        Created = DateTime.Now
                    });
                }

            }
        }
    }
}
