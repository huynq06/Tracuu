using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
namespace Web.Portal.Controller
{
    public class CustomerRegisterController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List()
        {
            int total = 0;
            int page = string.IsNullOrEmpty(Request["page"]) ? 1 : Convert.ToInt32(Request["page"]);
            int pageSize = string.IsNullOrEmpty(Request["ps"]) ? Web.Portal.Utils.DisplayMessage.PageSize : Convert.ToInt32(Request["ps"]);

            string code = string.IsNullOrEmpty(Request["code"]) ? string.Empty : Request["code"].Trim();
            string shortname = string.IsNullOrEmpty(Request["shortname"]) ? string.Empty : Request["shortname"].Trim();
            string fullname = string.IsNullOrEmpty(Request["fullname"]) ? string.Empty : Request["fullname"].Trim();
            string person = string.IsNullOrEmpty(Request["person"]) ? string.Empty : Request["person"].Trim();
          


            IList<Layer.CUSTOMER_REGISTER> cargoInouts = new DataAccess.CUSTOMER_REGISTER_ACCESS().GetPaging(page,
                                                                                  pageSize,  code, shortname, fullname, person,
                                                                                  ref total);
            ViewData["CUSTOMERREGISTERLIST"] = cargoInouts;
            ViewBag.TotalRecord = total;
            ViewBag.PageCurrent = (page - 1) * pageSize;
            ViewBag.Paging = Utils.DisplayMessage.CreatePaging("pagingcustomerrg", total, page, pageSize);
            return View();
        }
        [DocumentExport("EXCEL", "DANHSACH_DANGKYKINHDOANH")]
        public ActionResult Export()
        {
            int total = 0;


            string code = string.IsNullOrEmpty(Request["code"]) ? string.Empty : Request["code"].Trim();
            string shortname = string.IsNullOrEmpty(Request["shortname"]) ? string.Empty : Request["shortname"].Trim();
            string fullname = string.IsNullOrEmpty(Request["fullname"]) ? string.Empty : Request["fullname"].Trim();
            string person = string.IsNullOrEmpty(Request["person"]) ? string.Empty : Request["person"].Trim();



            IList<Layer.CUSTOMER_REGISTER> cargoInouts = new DataAccess.CUSTOMER_REGISTER_ACCESS().GetPaging(1,
                                                                                  Int32.MaxValue,  code, shortname, fullname, person,
                                                                                  ref total);
            ViewData["CUSTOMERREGISTERLIST"] = cargoInouts;
            ViewBag.TotalRecord = cargoInouts.Count;
          

            return View();
        }
        
        
       
        public ActionResult Edit(string id)
        {
            Web.Portal.Layer.CUSTOMER_REGISTER imp = new Layer.CUSTOMER_REGISTER();
            Web.Portal.DataAccess.CUSTOMER_REGISTER_ACCESS CUSTOMER_REGISTER_ACCESS = new Portal.DataAccess.CUSTOMER_REGISTER_ACCESS();
            if (!string.IsNullOrEmpty(id))
                imp = CUSTOMER_REGISTER_ACCESS.GetByID(id.Trim());
            else
                imp.CUSID = CUSTOMER_REGISTER_ACCESS.GenCode();
           
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
                Web.Portal.Layer.CUSTOMER_REGISTER imp = new Layer.CUSTOMER_REGISTER();
                DataAccess.CUSTOMER_REGISTER_ACCESS impAccess = new DataAccess.CUSTOMER_REGISTER_ACCESS();
                string cmd = Request["CMD"];
                imp = impAccess.GetByID(formRequest["keyValue"]);
                imp.CUSID = formRequest["CUSID"].Trim();
                imp.INFOR = formRequest["INFOR"].Trim();
                imp.REMARK1 = formRequest["REMARK1"].Trim();
                imp.REMARK = formRequest["REMARK"].Trim();
                
                imp.CREATED = DateTime.Now;
              
                if (cmd.Equals("ADD"))
                {
                    impAccess.Add(imp);
                    message = "Đã thêm mới dữ liệu thành công";
                }
                else
                {
                    impAccess.Update(formRequest["keyValue"].Trim(), imp);
                    message = "Đã sửa đổi dữ liệu thành công";
                }
                return Json(new { Type = messageType, Message = message, Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = "MÃ ĐĂNG KÝ ĐÃ TỒN TẠI VUI LÒNG NHẬP MÃ KHÁC", Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
       
        public ActionResult Delete(string id)
        {
            try
            {
                string message = "Đã xóa dữ liệu thành công!";
                new DataAccess.CUSTOMER_REGISTER_ACCESS().Delete(id);

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
        
        
    }
}
