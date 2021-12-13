using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.DataAccess
{
    public class TicketAccess:DataBase.DataProvider
    {
        public Layer.CapSo GetProperties(System.Data.IDataReader reader)
        {
            Layer.CapSo CapSo = new Layer.CapSo();
            CapSo.SPECIAL = Convert.ToInt32(GetValueField(reader, "TicketService", 0));
            CapSo.QUEUE = Convert.ToString(GetValueField(reader, "TicketNo", string.Empty));
            CapSo.CREATED = GetValueDateTimeField(reader, "TicketTime", CapSo.CREATED);
            CapSo.WAIT = CapSo.CREATED.HasValue ? Math.Round((DateTime.Now - CapSo.CREATED.Value).TotalMinutes, 0).ToString() : "0";
            return CapSo;
        }
        public Layer.CapSo GetPropertiesData(System.Data.IDataReader reader)
        {
            Layer.CapSo CapSo = new Layer.CapSo();
            CapSo.SPECIAL = Convert.ToInt32(GetValueField(reader, "TicketService", 0));
            CapSo.QUEUE = Convert.ToString(GetValueField(reader, "TicketNo", string.Empty));
            CapSo.IndexValue = Convert.ToInt32(GetValueField(reader, "IndexValue", 0));
            CapSo.CheckService = Convert.ToString(GetValueField(reader, "CheckService", string.Empty));
            CapSo.CREATED = GetValueDateTimeField(reader, "TicketTime", CapSo.CREATED);
            CapSo.WAIT = CapSo.CREATED.HasValue ? Math.Round((DateTime.Now - CapSo.CREATED.Value).TotalMinutes, 0).ToString() : "0";
            return CapSo;
        }

        public Layer.Ticket GetPropertiesTicket(System.Data.IDataReader reader)
        {
            Layer.Ticket Ticket = new Layer.Ticket();
            Ticket.TicketService = Convert.ToInt32(GetValueField(reader, "TicketService", 0));
            Ticket.ID = Convert.ToString(GetValueField(reader, "TicketNo", string.Empty));
            Ticket.TicketTime = GetValueDateTimeField(reader, "TicketTime", Ticket.TicketTime);
            Ticket.ReadTime = GetValueDateTimeField(reader, "ReadTime", Ticket.ReadTime);
            return Ticket;
        }
        public IList<Layer.CapSo> GetAll(int flg)
        {
            IList<Layer.CapSo> capsoList = new List<Layer.CapSo>();
            using (System.Data.IDataReader reader = CommandDataReader("GetTicketByFlg", flg))
            {

                while (reader.Read())
                    capsoList.Add(GetProperties(reader));

            }
            return capsoList;
        }
        public IList<Layer.CapSo> GetAll(DateTime? date)
        {
            IList<Layer.CapSo> capsoList = new List<Layer.CapSo>();
            using (System.Data.IDataReader reader = CommandDataReader("GetTicketByDate", date))
            {

                while (reader.Read())
                    capsoList.Add(GetProperties(reader));

            }
            return capsoList;
        }
        public IList<Layer.CapSo> GetData()
        {
            IList<Layer.CapSo> capsoList = new List<Layer.CapSo>();
            using (System.Data.IDataReader reader = CommandDataReader("GetDataByDateV2"))
            {

                while (reader.Read())
                    capsoList.Add(GetPropertiesData(reader));

            }
            return capsoList;
        }
        public IList<Layer.Ticket> GetAllBy(DateTime? date)
        {
            IList<Layer.Ticket> ticketList = new List<Layer.Ticket>();
            using (System.Data.IDataReader reader = CommandDataReader("GetTickByDateAll", date))
            {

                while (reader.Read())
                    ticketList.Add(GetPropertiesTicket(reader));

            }
            return ticketList;
        }
    }
}
