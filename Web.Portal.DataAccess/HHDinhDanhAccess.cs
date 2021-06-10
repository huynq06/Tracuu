using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
namespace Web.Portal.DataAccess
{
    public class HHDinhDanhAccess:DataBase.OracleProvider
    {
       
        public Layer.HHDinhDanh GetProperties(OracleDataReader reader)
        {

            Layer.HHDinhDanh HHDinhDanh = new Layer.HHDinhDanh();
            HHDinhDanh.ID = Convert.ToInt64(GetValueField(reader, "ID", 0));
            HHDinhDanh.MessageId = Convert.ToString(GetValueField(reader, "MessageId", string.Empty));
            HHDinhDanh.PathFile = Convert.ToString(GetValueField(reader, "PathFile", string.Empty));
            HHDinhDanh.Dec_Issuer = Convert.ToString(GetValueField(reader, "Dec_Issuer", string.Empty));
            HHDinhDanh.Dec_Reference = Convert.ToString(GetValueField(reader, "Dec_Reference", string.Empty));
            HHDinhDanh.Dec_Issue = GetValueDateTimeField(reader, "Dec_Issue", HHDinhDanh.Dec_Issue);
            HHDinhDanh.Dec_Function = Convert.ToInt32(GetValueField(reader, "Dec_Function", 0));
            HHDinhDanh.Cus_Name = Convert.ToString(GetValueField(reader, "Cus_Name", string.Empty));
            HHDinhDanh.Cus_Identity = Convert.ToString(GetValueField(reader, "Cus_Identity", string.Empty));
            HHDinhDanh.Port_Name = Convert.ToString(GetValueField(reader, "Port_Name", string.Empty));
            HHDinhDanh.Port_Identity = Convert.ToString(GetValueField(reader, "Port_Identity", string.Empty));
            HHDinhDanh.Te_TransportIdentity = Convert.ToString(GetValueField(reader, "Te_TransportIdentity", string.Empty));
            HHDinhDanh.Te_ArrivalDeparture = GetValueDateTimeField(reader, "Te_ArrivalDeparture", HHDinhDanh.Te_ArrivalDeparture);
            HHDinhDanh.Te_HouseBillOfLading = Convert.ToString(GetValueField(reader, "Te_HouseBillOfLading", string.Empty));
            HHDinhDanh.Te_MasterBillOfLading = Convert.ToString(GetValueField(reader, "Te_MasterBillOfLading", string.Empty));
            HHDinhDanh.Te_CargoCtrlNo = Convert.ToString(GetValueField(reader, "Te_CargoCtrlNo", string.Empty));
            HHDinhDanh.Te_CargoPiece = Convert.ToInt32(GetValueField(reader, "Te_CargoPiece", 0));
            HHDinhDanh.Te_PieceUnitCode = Convert.ToString(GetValueField(reader, "Te_PieceUnitCode", string.Empty));
            HHDinhDanh.Created = GetValueDateTimeField(reader, "Created", HHDinhDanh.Created);

            return HHDinhDanh;
        }
        public void Add(Layer.HHDinhDanh HHDinhDanh)
        {
            ExecuteNonQuery("HERMES_CUSTOM_ALSC.HHDinhDanh_ADD",
                  HHDinhDanh.MessageId,
                  HHDinhDanh.PathFile
                 , HHDinhDanh.Dec_Issuer
                 , HHDinhDanh.Dec_Reference
                 , HHDinhDanh.Dec_Issue
                 , HHDinhDanh.Dec_Function
                 , HHDinhDanh.Cus_Name
                 , HHDinhDanh.Cus_Identity
                 , HHDinhDanh.Port_Name
                 , HHDinhDanh.Port_Identity
                 , HHDinhDanh.Te_TransportIdentity
                 , HHDinhDanh.Te_ArrivalDeparture
                 , HHDinhDanh.Te_HouseBillOfLading
                 , HHDinhDanh.Te_MasterBillOfLading
                 , HHDinhDanh.Te_CargoCtrlNo
                 , HHDinhDanh.Te_CargoPiece
                 , HHDinhDanh.Te_PieceUnitCode
                 , DateTime.Now
              );
        }
        //THEO SODINHDANH,SO MAWB,SOHAWB,SOHIEUCB
        public IList<Layer.HHDinhDanh> GetPaging(int page, int pageSize, string cargoCtrlNo,
                                                                        string masterBillOfLading,
                                                                         string houseBillOfLading,
                                                                         string transportIdentity,
                                                                         DateTime? fromDate, DateTime? toDate, ref int totalRows)
        {
            IList<Layer.HHDinhDanh> HHDinhDanhList = new List<Layer.HHDinhDanh>();
            using (OracleDataReader reader = GetByOracleDataReader("HERMES_CUSTOM_ALSC.HHDinhDanh_GETPAGING", cargoCtrlNo.Trim(),
                masterBillOfLading.Trim(), houseBillOfLading.Trim(),
                transportIdentity.Trim(),
                GetNullDateTime(fromDate),
                GetNullDateTime(toDate), page, pageSize))
            {

                while (reader.Read())
                {
                    HHDinhDanhList.Add(GetProperties(reader));
                    totalRows = Convert.ToInt32(GetValueField(reader, "total", 0));
                }


            }
            return HHDinhDanhList;

        }
    }
}
