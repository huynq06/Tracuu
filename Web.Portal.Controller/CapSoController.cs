using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Web.Portal.Common.ViewModel;
using Web.Portal.DataAccess;

namespace Web.Portal.Controller
{
    public class CapSoController : GuestController
    {
      
        public ActionResult Index()
        {
            Session["CheckLogin"] = false;
            return View();
        }
        public ActionResult Main()
        {
            if((bool)Session["CheckLogin"])
            {
                return View();
            }
         
            else
            {
                return View("~/Views/CapSo/Index.cshtml");
            }
        }
        public ActionResult Action(FormCollection formRequest)
        {
            string password = formRequest["password"].Trim();
            if(password == "12345")
            {
                Session["CheckLogin"] = true;
              
                return Json(new { Message = "", Error = true, Func = "window.location.href='/capso/main';" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { Error = false, Type = Web.Portal.Utils.DisplayMessage.TypeError, Message = "mật khẩu", Title = "Thông báo" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Log()
        {
            return View();
        }
        public ActionResult List()
        {
            IList<Layer.CapSo> CapSoList = new List<Layer.CapSo>();
            CapSoList = new DataAccess.TicketAccess().GetData();
            IList<Web.Portal.Layer.CapSoLog> CapSoLogList = new DataAccess.CapSoLogAccess().GetAllBy(DateTime.Now);
            List<Layer.CapSo> CapSoList3 = CapSoList.Where(x => x.SPECIAL == 3).OrderByDescending(c=>c.CheckService).ThenByDescending(x => Convert.ToInt32(x.WAIT)).ToList();
            List<Layer.CapSo> CapSoList2 = CapSoList.Where(x => x.SPECIAL == 2).OrderByDescending(c => c.CheckService).ThenByDescending(x => Convert.ToInt32(x.WAIT)).ToList();
            List<Layer.CapSo> CapSoList1 = CapSoList.Where(x => x.SPECIAL == 1).OrderByDescending(c => c.CheckService).ThenByDescending(x => Convert.ToInt32(x.WAIT)).ToList();
          
          

            int totalAwbList3 = 0;
            int totalAwbList2 = 0;
            int totalAwbList1 = 0;


            
            foreach (var item in CapSoList3)
            {
                int AwbList3 = 0;
                IList<Web.Portal.Layer.CapSoLog> listCheck = CapSoLogList.Where(c => c.ID == item.QUEUE).ToList();
                if(listCheck.Count>0)
                {

                    item.AWBRemain = listCheck.Sum(c => c.AWBRemain);
                    foreach(var obj in listCheck)
                    {
                        if (obj.HAWB == "CA MAWB" || obj.HAWB == "ALLHAWB")
                        {
                            List<AwbDetailViewModel> listAwb = new AwbDetailAccess().GetAwbDetail(obj.MAWB, "ALL");
                            if(listAwb.Count > 1)
                            {
                                AwbList3 += listAwb.Count - 1;
                            }
                            else
                            {
                                AwbList3 += 1;  
                            }
                        }
                        else
                        {
                            AwbList3 += 1;
                        }
                    }
                }
               
                item.CountAWB = AwbList3;
                totalAwbList3 += AwbList3;
               // AwbList3 += CapSoLogList.Where(c => c.ID == item.QUEUE).ToList().Count;
            }
            foreach (var item in CapSoList2)
            {
                int AwbList2 = 0;
               
                IList<Web.Portal.Layer.CapSoLog> listCheck = CapSoLogList.Where(c => c.ID == item.QUEUE).ToList();
                if (listCheck.Count > 0)
                {
                    item.AWBRemain = listCheck.Sum(c => c.AWBRemain);
                    foreach (var obj in listCheck)
                    {
                        if (obj.HAWB == "CA MAWB" || obj.HAWB == "ALLHAWB")
                        {
                            List<AwbDetailViewModel> listAwb = new AwbDetailAccess().GetAwbDetail(obj.MAWB, "ALL");
                            if (listAwb.Count > 1)
                            {
                                AwbList2 += listAwb.Count - 1;
                            }
                            else
                            {
                                AwbList2 += 1;
                            }
                        }
                        else
                        {
                            AwbList2 += 1;
                        }
                    }
                }
                item.CountAWB = AwbList2;
                totalAwbList2 += AwbList2;
            }
            foreach (var item in CapSoList1)
            {
                int AwbList1 = 0;
                IList<Web.Portal.Layer.CapSoLog> listCheck = CapSoLogList.Where(c => c.ID == item.QUEUE).ToList();
                if (listCheck.Count > 0)
                {
                    item.AWBRemain = listCheck.Sum(c => c.AWBRemain);
                    foreach (var obj in listCheck)
                    {
                        if (obj.HAWB == "CA MAWB" || obj.HAWB== "ALLHAWB")
                        {
                            List<AwbDetailViewModel> listAwb = new AwbDetailAccess().GetAwbDetail(obj.MAWB, "ALL");
                            if (listAwb.Count > 1)
                            {
                                AwbList1 += listAwb.Count - 1;
                            }
                            else
                            {
                                AwbList1 += 1;
                            }
                        }
                        else
                        {
                            AwbList1 += 1;
                        }
                    }
                }
                item.CountAWB = AwbList1;
                totalAwbList1 += AwbList1;
            }
            string messageAller1 = "";
            string messageTranfer1 = "";
            if(CapSoList1.Where(c => c.CheckService == "WAIT").Any(c=>int.Parse(c.WAIT) >= 25))
            {
                messageAller1 = "Xem xét bổ sung đầu 1";
                if (CapSoList2.Where(c=>c.CheckService== "WAIT").All(c=>int.Parse(c.WAIT) < 15))
                {
                  
                    List<Layer.CapSo> capsoCheckSpecial1 = CapSoList.Where(c => c.CheckService == "PROCESS").ToList();
                    if(capsoCheckSpecial1.All(c=>c.IndexValue != 2 || (c.IndexValue == 2 && c.AWBRemain==0)))
                    {
                        messageTranfer1 = "Quầy 2 sẵn sàng phục vụ";
                    }
                    else if (capsoCheckSpecial1.All(c => c.IndexValue != 3 || (c.IndexValue == 3 && c.AWBRemain == 0)))
                    {
                        messageTranfer1 = "Quầy 3 sẵn sàng phục vụ";
                    }
                    else if (capsoCheckSpecial1.All(c => c.IndexValue != 4 || (c.IndexValue == 4 && c.AWBRemain == 0)))
                    {
                        messageTranfer1 = "Quầy 6 sẵn sàng phục vụ";
                    }
                    else if (capsoCheckSpecial1.All(c => c.IndexValue != 5 || (c.IndexValue == 5 && c.AWBRemain == 0)))
                    {
                        messageTranfer1 = "Quầy 5 sẵn sàng phục vụ";
                    }
                    else if (capsoCheckSpecial1.All(c => c.IndexValue != 6 || (c.IndexValue == 6 && c.AWBRemain == 0)))
                    {
                        messageTranfer1 = "Quầy 6 sẵn sàng phục vụ";
                    }
                    else
                    {
                        capsoCheckSpecial1 = capsoCheckSpecial1.Where(c =>(c.IndexValue==2 || c.IndexValue==3 || c.IndexValue==4 || c.IndexValue==5 || c.IndexValue==6) && c.AWBRemain == 1).ToList();
                        if(capsoCheckSpecial1.Count > 0)
                        {
                            messageTranfer1 = "Quầy " + capsoCheckSpecial1[0].IndexValue + " có thể phục vụ";
                        }
                        else
                        {
                            messageTranfer1 = "Tất cả các quầy đầu 2 đều bận!";
                        }
                    }
                    //kiem tra xem quầy nào có thể phục vụ
                }
                else
                {
                    messageTranfer1 = "Tất cả các quầy đầu 2 đều bận!";
                }
            }
            string messageAller2 = "";
            string messageTranfer2 = "";
            if (CapSoList2.Where(c => c.CheckService == "WAIT").Any(c => int.Parse(c.WAIT) >= 20))
            {
                messageAller2 = "Xem xét bổ sung đầu 2";
                if (CapSoList1.Where(c => c.CheckService == "WAIT").All(c => int.Parse(c.WAIT) < 20))
                {
                    messageAller2 = "Xem xét bổ sung đầu 2";
                    List<Layer.CapSo> capsoCheckSpecial1 = CapSoList.Where(c => c.CheckService == "PROCESS").ToList();
                    if (capsoCheckSpecial1.All(c => c.IndexValue != 7 || (c.IndexValue == 7 && c.AWBRemain == 0)))
                    {
                        messageTranfer2 = "Quầy 7 sẵn sàng phục vụ";
                    }
                    else if (capsoCheckSpecial1.All(c => c.IndexValue != 8 || (c.IndexValue == 8 && c.AWBRemain == 0)))
                    {
                        messageTranfer2 = "Quầy 8 sẵn sàng phục vụ";
                    }
                    else if (capsoCheckSpecial1.All(c => c.IndexValue != 9 || (c.IndexValue == 9 && c.AWBRemain == 0)))
                    {
                        messageTranfer2 = "Quầy 9 sẵn sàng phục vụ";
                    }
                    else if (capsoCheckSpecial1.All(c => c.IndexValue != 10 || (c.IndexValue == 10 && c.AWBRemain == 0)))
                    {
                        messageTranfer2 = "Quầy 10 sẵn sàng phục vụ";
                    }
                    else if (capsoCheckSpecial1.All(c => c.IndexValue != 11 || (c.IndexValue == 11 && c.AWBRemain == 0)))
                    {
                        messageTranfer2 = "Quầy 11 sẵn sàng phục vụ";
                    }
                    else
                    {
                        capsoCheckSpecial1 = capsoCheckSpecial1.Where(c => c.AWBRemain == 1).ToList();
                        if (capsoCheckSpecial1.Count > 0)
                        {
                            messageTranfer2 = "Quầy " + capsoCheckSpecial1[0].IndexValue + " sẵn sàng phục vụ";
                        }
                        else
                        {
                            messageTranfer2 = "Tất cả các quầy đầu 1 đều bận!";
                        }
                    }
                    //kiem tra xem quầy nào có thể phục vụ
                }
                else
                {
                    messageTranfer2 = "Tất cả các quầy đầu 1 đều bận!";
                }
            }
            int totalAWBProcess = CapSoList.Where(c => c.CheckService == "PROCESS" && c.AWBRemain > 0).Sum(c => c.AWBRemain);
            int toatalAWBWait = CapSoList.Where(c => c.CheckService == "WAIT").Sum(c => c.CountAWB);
            int totalProcess = CapSoList.Where(c => c.CheckService == "PROCESS" && c.AWBRemain > 0).ToList().Count;
            int totalWait = CapSoList.Where(c => c.CheckService == "WAIT").ToList().Count;
            //int totalDone = CapSoList.Where(c => c.CheckService == "WAIT").ToList().Count;


            int totalAWBProcessQ3 = CapSoList.Where(c => c.CheckService == "PROCESS" && c.SPECIAL == 3 && c.AWBRemain > 0).Sum(c => c.AWBRemain);
            int toatalAWBWaitQ3 = CapSoList.Where(c => c.CheckService == "WAIT" && c.SPECIAL == 3).Sum(c => c.CountAWB);
            int totalProcessQ3 = CapSoList.Where(c => c.CheckService == "PROCESS" && c.SPECIAL == 3 && c.AWBRemain > 0).ToList().Count;
            int totalWaitQ3 = CapSoList.Where(c => c.CheckService == "WAIT" && c.SPECIAL == 3).ToList().Count;
            int totalDoneQ3 = CapSoList.Where(c => c.CheckService == "DONE" && c.SPECIAL == 3).ToList().Count;
            int totalAWBDoneQ3 = CapSoList.Where(c => c.CheckService == "DONE" && c.SPECIAL == 3).Sum(c => c.CountAWB);

            int totalAWBProcessQ2 = CapSoList.Where(c => c.CheckService == "PROCESS" && c.SPECIAL == 2 && c.AWBRemain>0).Sum(c => c.AWBRemain);
            int toatalAWBWaitQ2 = CapSoList.Where(c => c.CheckService == "WAIT" && c.SPECIAL == 2).Sum(c => c.CountAWB);
            int totalProcessQ2 = CapSoList.Where(c => c.CheckService == "PROCESS" && c.SPECIAL == 2 && c.AWBRemain > 0).ToList().Count;
            int totalWaitQ2 = CapSoList.Where(c => c.CheckService == "WAIT" && c.SPECIAL == 2).ToList().Count;
            int totalDoneQ2 = CapSoList.Where(c => c.CheckService == "DONE" && c.SPECIAL == 2).ToList().Count;
            int totalAWBDoneQ2 = CapSoList.Where(c => c.CheckService == "DONE" && c.SPECIAL == 2).Sum(c => c.CountAWB);

            int totalAWBProcessQ1 = CapSoList.Where(c => c.CheckService == "PROCESS" && c.SPECIAL == 1 && c.AWBRemain > 0).Sum(c => c.AWBRemain);
            int toatalAWBWaitQ1 = CapSoList.Where(c => c.CheckService == "WAIT" && c.SPECIAL == 1).Sum(c => c.CountAWB);
            int totalProcessQ1 = CapSoList.Where(c => c.CheckService == "PROCESS" && c.SPECIAL == 1 && c.AWBRemain > 0).ToList().Count;
            int totalWaitQ1 = CapSoList.Where(c => c.CheckService == "WAIT" && c.SPECIAL == 1).ToList().Count;
            int totalDoneQ1 = CapSoList.Where(c => c.CheckService == "DONE" && c.SPECIAL == 1).ToList().Count + CapSoList.Where(c => c.CheckService == "PROCESS" && c.SPECIAL == 1 &&  c.AWBRemain == 0).ToList().Count;
            int totalAWBDoneQ1 = CapSoList.Where(c => c.CheckService == "DONE" && c.SPECIAL == 1).Sum(c => c.CountAWB);

            ViewBag.totalAWBProcess = totalAWBProcess;
            ViewBag.toatalAWBWait = toatalAWBWait;
            ViewBag.totalProcess = totalProcess;
            ViewBag.totalWait = totalWait;
            ViewBag.totalDone = totalDoneQ3 + totalDoneQ2 + totalDoneQ1;
            ViewBag.totalAwbDone = totalAWBDoneQ3 + totalAWBDoneQ2 + totalAWBDoneQ1;

            ViewBag.totalAWBProcessQ3 = totalAWBProcessQ3;
            ViewBag.toatalAWBWaitQ3 = toatalAWBWaitQ3;
            ViewBag.totalProcessQ3 = totalProcessQ3;
            ViewBag.totalWaitQ3 = totalWaitQ3;
            ViewBag.totalDoneQ3 = totalDoneQ3;
            ViewBag.totalAWBDoneQ3 = totalAWBDoneQ3;

            ViewBag.totalAWBProcessQ2 = totalAWBProcessQ2;
            ViewBag.toatalAWBWaitQ2 = toatalAWBWaitQ2;
            ViewBag.totalProcessQ2 = totalProcessQ2;
            ViewBag.totalWaitQ2 = totalWaitQ2;
            ViewBag.totalDoneQ2 = totalDoneQ2;
            ViewBag.totalAWBDoneQ2 = totalAWBDoneQ2;

            ViewBag.totalAWBProcessQ1 = totalAWBProcessQ1;
            ViewBag.toatalAWBWaitQ1 = toatalAWBWaitQ1;
            ViewBag.totalProcessQ1 = totalProcessQ1;
            ViewBag.totalWaitQ1 = totalWaitQ1;
            ViewBag.totalDoneQ1 = totalDoneQ1;
            ViewBag.totalAWBDoneQ1 = totalAWBDoneQ1;

            ViewBag.MessageAller1 = messageAller1;
            ViewBag.MessageTranfer1 = messageTranfer1;
            ViewBag.MessageAller2 = messageAller2;
            ViewBag.MessageTranfer2 = messageTranfer2;

            List<Layer.CapSo> CapSoList1Filter1 = CapSoList1.Where(c => c.AWBRemain > 0 && c.CheckService != "DONE").ToList();
            List<Layer.CapSo> CapSoList1Filter2 = CapSoList2.Where(c => c.AWBRemain > 0 && c.CheckService != "DONE").ToList(); ;
            List<Layer.CapSo> CapSoList1Filter3 = CapSoList3.Where(c => c.AWBRemain > 0 && c.CheckService != "DONE").ToList();
            ViewData["CapSoList3"] = CapSoList1Filter3;
            ViewData["CapSoList2"] = CapSoList1Filter2;
            ViewData["CapSoList1"] = CapSoList1Filter1;
            return View();
        }
        public void Show()
        {
            DateTime? date = string.IsNullOrEmpty(Request["date"]) ? DateTime.Now : Utils.Format.ConvertDate(Request["date"]);
            IList<Web.Portal.Layer.Ticket> TicketList = new DataAccess.TicketAccess().GetAllBy(date);
            IList<Web.Portal.Layer.AgenInfo> AgenList = new DataAccess.InvoiceAccess().GetAllGenInfo(date);
            IList<Web.Portal.Layer.CapSoLog> CapSoLogList = new DataAccess.CapSoLogAccess().GetAllBy(date);
            ViewData["TicketList"] = TicketList;
            ViewData["CapSoLogList"] = CapSoLogList;
            ViewData["AgenList"] = AgenList.OrderBy(x => Convert.ToDateTime(x.AGENTIME)).ToList();
            ViewBag.DATE = date.HasValue ? date.Value.ToString("dd/MM/yyyy") : string.Empty;

        }
        public ActionResult ListLog()
        {
            Show();
            return View();
        }
        [DocumentExport("EXCEL", "BAOCAOCAPSO")]
        public ActionResult Export()
        {
            Show();
            return View();
        }
    }
}
