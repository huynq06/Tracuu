using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.DataAccess
{
    public class FlightControlAccess : FLightControlProvider
    {
        public string GenGoupNo()
        {
            string Id = GenerateId("GroupManagement", "GroupNo", 14, "10022", true);
            return Id;
        }
        public string GenerateId(string TableName, string ColumnName, int ColumnLength, string Prefix, bool Padding)
    {
        string Query, con, Id;
        con = System.Configuration.ConfigurationManager.ConnectionStrings["ALSC_FlightControl"].ToString();
            SqlConnection cn = new SqlConnection(con);
        int preLength,padLength;
        preLength = Convert.ToInt32(Prefix.Length);
        padLength = ColumnLength - preLength;
        if (Padding == true )
        {
             Query = "SELECT '" + Prefix + "' + REPLACE(STR(MAX(CAST(SUBSTRING(" + ColumnName + "," + Convert.ToString(preLength + 1) + "," + padLength + ") AS INTEGER))+1," + padLength + "),' ',0) FROM " + TableName;

        }
        else
        {
            Query = "SELECT '" + Prefix + "' + CAST(MAX(CAST(SUBSTRING(" + ColumnName + "," + Convert.ToString(preLength + 1) + "," + padLength + ") AS INTEGER))+1 AS VARCHAR) FROM " + TableName;
        }
        SqlCommand com = new SqlCommand(Query, cn);
        cn.Open();
        if (com.ExecuteScalar().ToString() == "")
        {
            Id = Prefix;
            if (Padding == true)
            {
                for (int i = 1; i <padLength - 1; i++)
                {
                    Id += "0";
                }
            }
            Id += "1";
        }
        else
        {
            Id = Convert.ToString(com.ExecuteScalar());
        }
        cn.Close();
        return Id;
}
    }
}
