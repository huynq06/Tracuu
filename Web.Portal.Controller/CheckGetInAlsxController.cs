using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Service;
using Web.Portal.Model.Models;
using System.Web.Mvc;
using Web.Portal.Common;
using Web.Portal.Common.ViewModel;
using System.Web.Script.Serialization;
using System.Xml.Linq;
using Web.Portal.DataAccess;
using Web.Portal.Common.ApiViewModel;
using System.IO;
using Web.Portal.Model;

namespace Web.Portal.Controller
{
    [Web.Portal.Sercurity.AuthorizedBase(Roles = "ADMIN,KHAITHAC,KHOKEODAI,CUSTOMER,XEMUYQUYEN,KTN,KTX")]
    public class CheckGetInAlsxController : BaseController
    {
        public ActionResult Index()
        {
            string check = "true";
            string userName = WebMatrix.WebData.WebSecurity.CurrentUserName;
            if(userName.ToLower() != "admin")
            {
                check = "false";
            }
            ViewBag.CheckUserLogin = check;
            return View();
        }
        public ActionResult List()
        {
            string warehouse = "";
            string userName = WebMatrix.WebData.WebSecurity.CurrentUserName;
            if (userName.ToLower() == "admin")
            {
                warehouse = Request["warehouse"].Trim();
            }
            else
            {
                warehouse = userName.ToUpper();
            }
            string fdate = Request["fda"];
            string tdate = Request["tda"];
            int status = int.Parse(Request["checkStatus"].ToString());
            List<GetInAlsxViewModel> listCheckTemp = new List<GetInAlsxViewModel>();
            List<GetInAlsxViewModel> listCheckReal = new List<GetInAlsxViewModel>();
            listCheckTemp = new CheckGetInAlsxAccess().GetData(fdate,tdate,warehouse);
            foreach(var item in listCheckTemp)
            {
                item.totalSTK = listCheckTemp.Where(c => c.Labs_ID == item.Labs_ID).Count();
                item.Check1 = false;
                item.Check2 = false;
          
                int piecesXML = item.Pieces_XML;
                int piecesH5 = item.Pieces_H5;
                if (item.Pieces_XML == item.Pieces_H5)
                    item.Check1 = true;
                if (item.Pieces_Custom == item.UCR_PIECES)
                    item.Check2 = true;
                if ((item.Pieces_Status3 == item.GETIN_PIECES) && (item.GETIN_PIECES != 0))
                {
                    item.Check3 = 2;
                }
                    
                if ((item.Pieces_Status3 == item.GETOUT_PIECES) && (item.GETOUT_PIECES != 0))
                {
                    item.Check4 = 2;
                }
                  

             //   int totalPiecesCustom = listCheck.Where(c => c.AWB == item.AWB).Sum(c => c.Pieces_Custom);
              //  int totalPiecesStatus3 = listCheck.Where(c => c.AWB == item.AWB).Sum(c => c.Pieces_Status3);
                //if(piecesXML== piecesH5 && piecesH5== totalPiecesCustom && totalPiecesCustom== totalPiecesStatus3)
                //{
                //    item.Awb_Status = 1;
                //}
                //else
                //{
                //    item.Awb_Status = 0;
                //}
                if(listCheckReal.All(c=>c.AWB != item.AWB))
                {
                    listCheckReal.Add(item);
                }
                //else
                //{
                //    GetInAlsxViewModel newItem = new GetInAlsxViewModel();
                //    newItem.AWB = "";
                //    newItem.AWB_PREFIX = "";
                //    newItem.AWB_SERIAL = "";
                //    newItem.WareHouse = "";
                //    newItem.Pieces_H5 = 0;
                //    newItem.Pieces_XML = 0;
                //    newItem.Pieces_Custom = item.Pieces_Custom;
                //    newItem.SDD = item.SDD;
                //    newItem.Pieces_Status3 = item.Pieces_Status3;
                //    newItem.GetIn_Status = item.GetIn_Status;
                //    newItem.GetOut_status = item.GetOut_status;
                //    newItem.Awb_Status = item.Awb_Status;
                //    listCheckReal.Add(newItem);
                //}

            }
            foreach(var item in listCheckTemp)
            {
                if(listCheckTemp.Where(c=>c.Labs_ID == item.Labs_ID).All(c=>c.Check3==2))
                {
                    item.GetIn_Status = 2;
                    item.Message_GetIn = "ALL";
                }
                else if(listCheckTemp.Where(c => c.Labs_ID == item.Labs_ID).Any(c => c.Check3 == 2))
                {
                    item.GetIn_Status = 1;
                    int count = listCheckTemp.Where(c => c.Labs_ID == item.Labs_ID && c.Check3 == 2).Count();
                    item.Message_GetIn = count + "/" + item.totalSTK;
                }
                else
                {
                    item.GetIn_Status = 0;
                    item.Message_GetIn =  "0/" + item.totalSTK;
                }
                if (listCheckTemp.Where(c => c.Labs_ID == item.Labs_ID).All(c => c.Check4 == 2))
                {
                    item.GetOut_status = 2;
                    item.Message_Getout = "ALL";
                }
                else if (listCheckTemp.Where(c => c.Labs_ID == item.Labs_ID).Any(c => c.Check4 == 2))
                {
                    int count = listCheckTemp.Where(c => c.Labs_ID == item.Labs_ID && c.Check4 == 2).Count();
                    item.GetOut_status = 1;
                    item.Message_Getout = count + "/" + item.totalSTK;
                }
                else
                {
                    item.GetOut_status = 0;
                    item.Message_Getout = "0/" + item.totalSTK;
                }
                if(item.GetIn_Status == 1 || item.GetOut_status ==1 || listCheckTemp.Where(c => c.Labs_ID == item.Labs_ID).Any(c => c.Check2 == false))
                {
                    item.Status = 0;
                }
            }
            if(status != -1)
            {
                listCheckReal = listCheckReal.Where(c => c.Status == status).ToList();
            }
            ViewData["ListGetInXML"] = listCheckTemp;
            ViewData["ListGetInAWB"] = listCheckReal;
            return View();
        }
        public ActionResult CheckError()
        {
            string sdd = Request["SDD"];
            string message = "";
            string command = "";
            if(!sdd.StartsWith("1221"))
            {
                message = "Số định danh không tồn tại!";
                command = "Kiểm tra lại thông tin số định danh";
            }
            else
            {
                message = "Sai thông tin XML và tờ khai hải quan";
                command = "Kiểm tra lại thông tin tờ khai";
            }
            //    string invoiceIsn = Request["invoiceIsn"].Trim();
            ViewBag.Message = message;
            ViewBag.Command = command;
            return View();
        }
    }
}
