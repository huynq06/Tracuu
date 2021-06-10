using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class GetInAlsxViewModel
    {
        public string Labs_ID { set; get; }
        public string  ID_XML { set; get; }
        public string AWB_PREFIX { set; get; }
        public string AWB_SERIAL { set; get; }
        public string WareHouse { set; get; }
        public string AWB { set; get; }
        public int Pieces_XML { set; get; }
        public int UCR_PIECES { set; get; }
        public double Weight_XML { set; get; }
        public int Pieces_H5 { set; get; }
        public int Pieces_Status3 { set; get; }
        public double Weight_H5 { set; get; }
        public int GETIN_PIECES { set; get; }
        public int GETOUT_PIECES { set; get; }
        public string SDD { set; get; }
        public string SDD_CUSTOM { set; get; }
        public DateTime? Created { set; get; }
        public string Booking { set; get; }
        public int Pieces_Custom { set; get; }
        public string PreMessage { set; get; }
        public string Message_Custom { set; get; }
        public int Awb_Status { set; get; }
        public int GetInProcess { set; get; }
        public int GetIn_Status { set; get; }
        public int GetOut_status { set; get; }
        public bool Check1 { set; get; }
        public bool Check2 { set; get; }
        public int Check3 { set; get; }
        public int Check4 { set; get; }
        public int RECEIVED { set; get; }
        public int DEPARTED { set; get; }
        public int RECEIVED_CHECK { set; get; }
        public int DEPARTED_CHECK { set; get; }
        public int totalSTK { set; get; }
        public int GetOut_STK { set; get; }
        public int GetIn_STK { set; get; }
        public string Message_GetIn { set; get; }
        public string Message_Getout { set; get; }

        public DateTime? GETIN_CREATED { set; get; }
        public DateTime? GETOUT_CREATED { set; get; }
        public string RECEIVED_DATETIME { set; get; }
        public string DEPARTED_DATETIME { set; get; }
        public int Status { set; get; }


    }
}
