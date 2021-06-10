using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
namespace Web.Portal.Utils
{
    public class SQLUtils
    {
        public static void GetSQL(string path, string id, ref string sql, ref string[] find, ref string[] column)
        {
            System.Xml.XmlDocument xmlDoc = new System.Xml.XmlDocument();
            xmlDoc.Load(path);
            sql = GetElement(xmlDoc, id.ToUpper(), "SQL", string.Empty);
            find = GetElement(xmlDoc, id.ToUpper(), "FIND", string.Empty).Split(',');
            column = GetElement(xmlDoc, id.ToUpper(), "COLUMN", string.Empty).Split(',');
        }
        public static void GetSQLDes(string path, string id, ref string sql, ref string[] find, ref string[] column, ref string des)
        {
            System.Xml.XmlDocument xmlDoc = new System.Xml.XmlDocument();
            xmlDoc.Load(path);
            sql = GetElement(xmlDoc, id.ToUpper(), "SQL", string.Empty);
            find = GetElement(xmlDoc, id.ToUpper(), "FIND", string.Empty).Split(',');
            column = GetElement(xmlDoc, id.ToUpper(), "COLUMN", string.Empty).Split(',');
            des = GetElement(xmlDoc, id.ToUpper(), "DES", string.Empty);
        }
        public static string GetElement(XmlDocument xmlMain, string Name, string Default)
        {
            try
            {
                return xmlMain.GetElementsByTagName(Name) != null ? xmlMain.GetElementsByTagName(Name)[0].InnerText : Default;
            }
            catch (Exception)
            {
                return Default;
            }
        }
        public static string GetElementContentXml(XmlDocument xmlMain, string Name, string Default)
        {
            try
            {
                return xmlMain.GetElementsByTagName(Name) != null ? xmlMain.GetElementsByTagName(Name)[0].InnerXml : Default;
            }
            catch (Exception)
            {
                return Default;
            }
        }
        public static string GetElement(XmlDocument xmlMain, string parent, string Name, string Default)
        {
            try
            {
                if (xmlMain.GetElementsByTagName(parent).Count > 0)
                {
                    foreach (XmlNode item in xmlMain.GetElementsByTagName(parent)[0].ChildNodes)
                    {
                        if (item.Name.ToUpper().Equals(Name.ToUpper()))
                        {
                            if (string.IsNullOrEmpty(item.InnerText.Trim()))
                                return Default;

                            return item.InnerText.Trim();
                        }
                    }
                }

            }
            catch (Exception)
            {

            }
            return Default;
        }
        public static string GetElement(XmlNode xmlNode, string Name, string Default)
        {
            try
            {

                foreach (XmlNode item in xmlNode.ChildNodes)
                {
                    if (item.Name.Trim().ToUpper().Equals(Name.Trim().ToUpper()))
                    {
                        if (string.IsNullOrEmpty(item.InnerText.Trim()))
                            return Default;

                        return item.InnerText.Trim();
                    }
                }


            }
            catch (Exception)
            {

            }
            return Default;
        }

        public static void SetValueElement(XmlDocument xmlMain, string parent, string Name, object Value)
        {
            try
            {
                if (xmlMain.GetElementsByTagName(parent).Count > 0)
                {
                    foreach (XmlNode item in xmlMain.GetElementsByTagName(parent)[0].ChildNodes)
                    {
                        if (item.Name.Trim().ToUpper().Equals(Name.Trim().ToUpper()))
                        {
                            item.InnerText = Convert.ToString(Value);
                        }
                    }
                }

            }
            catch (Exception)
            {

            }

        }
        public static void SetValueElementXml(XmlDocument xmlMain, string parent, string Name, object Value)
        {
            try
            {
                if (xmlMain.GetElementsByTagName(parent).Count > 0)
                {
                    foreach (XmlNode item in xmlMain.GetElementsByTagName(parent)[0].ChildNodes)
                    {
                        if (item.Name.Trim().ToUpper().Equals(Name.Trim().ToUpper()))
                        {
                            item.InnerXml = Convert.ToString(Value);
                        }
                    }
                }

            }
            catch (Exception)
            {

            }

        }
    }
}
