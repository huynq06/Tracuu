using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Utils
{
    public partial class Log
    {
        public static object _locker = new object();

        private static ConcurrentQueue<Log> _LogQueue = new ConcurrentQueue<Log>();

        public static int QueueCount()
        {
            return _LogQueue.Count;
        }

        private static List<Log> DeQueue(int batchSize)
        {
            List<Log> retList = new List<Log>();
            while (retList.Count < batchSize && !_LogQueue.IsEmpty)
            {
                Log dequeuElement = null;
                _LogQueue.TryDequeue(out dequeuElement);
                if (dequeuElement != null) retList.Add(dequeuElement);
            }
            return retList;
        }


        public static void WriteLog(string logText)
        {
            string fileName = DateTime.Now.ToString("yyyy-MM-dd") + "-log.txt";
            WriteLog(logText, fileName);
        }

        public static void WriteLog(string logText, string fileName)
        {
            try
            {
                logText = string.Format("========={0}=========\n{1}\n", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"), logText);
                var path = "C://logs";
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                if (string.IsNullOrWhiteSpace(fileName))
                    fileName = DateTime.Now.ToString("yyyy-MM-dd") + "-log.txt";
                string fullPath = Path.Combine(path, fileName);
                lock (_locker)
                {
                    using (Stream s = new FileStream(fullPath, FileMode.Append, FileAccess.Write, FileShare.ReadWrite))
                    {
                        using (StreamWriter w = new StreamWriter(s))
                        {
                            w.WriteLine(logText);
                        }
                    }
                }
            }
            catch {
            }
        }

        public static void WriteLog(Exception ex)
        {
            string fileName = DateTime.Now.ToString("yyyy-MM-dd") + "-log.txt";
            WriteLog(ex, fileName);
        }

        public static void WriteLog(Exception ex, string fileName)
        {
            WriteLog(ex.ToString(), fileName);
        }
    }
}
