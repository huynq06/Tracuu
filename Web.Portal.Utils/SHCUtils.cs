using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Utils
{
    public class SHCUtils
    {
       public  List<string> listSHC = new List<string>(new string[] { "VUN", "VIC", "VAL", "PER", "AVI", "HUM", "DIP", "SWP", "WAS", "OHG", "MUW", "HEG", "HEA","PER","PIL","PEF","PEM","PEP","PES","PEA","HEG","LHO","ICE","EAT","WET","FRO","FRI","COLD","FRZ","COL","AMBT","CRT","ERT","CAO","DGD","EBI","EBM","ELI","ELM","ICE"});
        public string GetSHC(string input)
        {

            string output = "";
            string[] data = input.Split(',');
            for (int i = 0; i < data.Length; i++)
            {
                if(data[i].StartsWith("P") || data[i].StartsWith("R"))
                {
                    output += data[i] + ",";
                }
                else if(listSHC.Contains(data[i]))
                {
                    output += data[i] + ",";
                }

            }
            return output.TrimEnd(',');
        }
        public bool CheckSHC(string input)
        {
            bool check = false;
            string[] data = input.Split(',');
            string[] arrcheck = new string[] { "99A", "99D", "99F", "99N", "99P", "99V", "99W" };
            for (int i = 0; i < data.Length; i++)
            {
                if(arrcheck.Contains(data[i].Trim()))
                {
                    check = true;
                    break;
                }
            }
            return check;

        }
        public string ChechCODE(string input)
        {
            string output = "";
            switch (input)
            {
                case "WEIGHT/PIECE NUMBER ON FWB/FHL DIFF WZ AWB SHOWN":
                    output = "WEIGHT/PIECE NUMBER ON FWB/FHL DIFF WZ AWB SHOWN";
                    break;
                case "CNEE ON FHL/FWB DIFF WZ AWB SHOWN":
                    output = "CNEE ON FHL/FWB DIFF WZ AWB SHOWN";
                    break;
                case "WRONG HAWB NBR ON FHL":
                    output = "WRONG HAWB NBR ON FHL";
                    break;
                case "NO FHL/FWB MSG":
                    output = "NO FHL/FWB MSG";
                    break;
                case "WRONG DEST ON AWB":
                    output = "WRONG DEST ON AWB";
                    break;
                case "WRONG DEST ON FWB/FHL":
                    output = "WRONG DEST ON FWB/FHL";
                    break;
                case "CNEE INFO UNCLEAR":
                    output = "CNEE INFO UNCLEAR";
                    break;
                case "NO HAWB  ATTACHED":
                    output = "NO HAWB  ATTACHED";
                    break;
                default:
                    output = "OTHER";
                    break;
            }
            return output;
        }
    
    }
}
