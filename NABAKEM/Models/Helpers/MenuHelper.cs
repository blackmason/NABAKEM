using NABAKEM.Models.Domains;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace NABAKEM.Models.Helpers
{
    public class MenuHelper : RootDataAccessHelper
    {
        /* 전체메뉴 가져오기 */
        public List<Menus> GetAllMenus()
        {
            string sql = "MENU_ALL_USP";

            SetConnectionString();
            Menus menus;
            List<Menus> menuList = new List<Menus>();
            using (connection = new SqlConnection(connectionString))
            {
                connection.Open();
                command = new SqlCommand(sql, connection);
                reader = command.ExecuteReader();

                while (reader.Read())
                {
                    menus = new Menus();
                    menus.Code = reader["CODE"].ToString();
                    menus.ParentCode = reader["P_CODE"].ToString();
                    menus.TypeCode = reader["TYPE_CD"].ToString();
                    menus.Name = reader["NAME"].ToString();
                    menus.Url = reader["URL"].ToString();
                    menus.IsUse = reader["IS_USE"].ToString();
                    menus.AuthLevel = reader["AUTH_LVL"].ToString();
                    menus.Ordering = reader["ORDERING"].ToString();
                    menus.Comment = reader["COMMENT"].ToString();
                    menus.Modified = reader["MODIFIED"].ToString();
                    menus.Registered = reader["REGISTERED"].ToString();
                    menuList.Add(menus);
                }
                connection.Close();
            }
            return menuList;
        }

        public List<Menus> GetParentMenus()
        {
            string sql = "MENU_PARENT_USP";
            Menus menus;
            List<Menus> parentMenus;

            SetConnectionString();
            using (connection = new SqlConnection(connectionString))
            {
                connection.Open();
                command = new SqlCommand(sql, connection);
                reader = command.ExecuteReader();

                parentMenus = new List<Menus>();
                while (reader.Read())
                {
                    menus = new Menus();
                    menus.Code = reader["CODE"].ToString();
                    menus.Name = reader["NAME"].ToString();
                    parentMenus.Add(menus);
                }
                connection.Close();
            }

            return parentMenus;
        }

        public List<Menus> GetSubMenus()
        {
            string sql = "SELECT CODE, NAME FROM MENUS WHERE P_CODE != '0'";
            List<Menus> subMenuList;
            SetConnectionString();
            using (connection = new SqlConnection(connectionString))
            {
                connection.Open();
                command = new SqlCommand(sql, connection);
                reader = command.ExecuteReader();

                subMenuList = new List<Menus>();
                Menus menu;
                while (reader.Read())
                {
                    menu = new Menus();
                    menu.Code = reader[0].ToString();
                    menu.Name = reader[1].ToString();
                    subMenuList.Add(menu);
                }

                connection.Close();
            }

            return subMenuList;
        }

        public Menus GetMenu(string code)
        {
            string sql = string.Format("SELECT A.CODE, A.P_CODE, A.NAME, A.URL, A.ORDERING, A.COMMENT, A.IS_USE, B.AUTH_LVL FROM MENUS A INNER JOIN MENU_GROUPS B ON A.TYPE_CD = B.CODE WHERE A.CODE = '{0}'", code);

            Menus menu = null;
            SetConnectionString();
            using (connection = new SqlConnection(connectionString))
            {
                connection.Open();
                command = new SqlCommand(sql, connection);
                reader = command.ExecuteReader();

                if (reader.Read())
                {
                    menu = new Menus();
                    menu.Code = reader[0].ToString();
                    menu.ParentCode = reader[1].ToString();
                    menu.Name = reader[2].ToString();
                    menu.Url = reader[3].ToString();
                    menu.Ordering = reader[4].ToString();
                    menu.Comment = reader[5].ToString();
                    menu.IsUse = reader[6].ToString();
                    //menu.Role = reader[7].ToString();
                }
                connection.Close();
            }

            return menu;
        }

        public int AddMenu(string code, string name, string parentCode, string url, string role, string enabled, string ordering, string comment)
        {
            int result;
            string sql = "MENU_ADD_USP";

            SetConnectionString();
            using (connection = new SqlConnection(connectionString))
            {
                connection.Open();
                command = new SqlCommand(sql, connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@CODE", code);
                command.Parameters.AddWithValue("@P_CODE", parentCode);
                command.Parameters.AddWithValue("@NAME", name);
                command.Parameters.AddWithValue("@URL", url);
                command.Parameters.AddWithValue("@ENABLED", enabled);
                command.Parameters.AddWithValue("@ROLE", role);
                command.Parameters.AddWithValue("@ORDERING", ordering);
                command.Parameters.AddWithValue("@COMMENT", comment);
                result = command.ExecuteNonQuery();
                connection.Close();
            }

            return result;
        }

        public int UpdateMenu(string code, string name, string parentCode, string url, string isUse, string ordering, string comment)
        {
            int result;
            string sql = "MENU_UPDATE_USP";

            SetConnectionString();
            using (connection = new SqlConnection(connectionString))
            {
                connection.Open();
                command = new SqlCommand(sql, connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@NAME", name);
                command.Parameters.AddWithValue("@P_CODE", parentCode);
                command.Parameters.AddWithValue("@URL", url);
                command.Parameters.AddWithValue("@IS_USE", isUse);
                command.Parameters.AddWithValue("@ORDERING", ordering);
                command.Parameters.AddWithValue("@COMMENT", comment);
                command.Parameters.AddWithValue("@CODE", code);
                result = command.ExecuteNonQuery();
                connection.Close();
            }

            return result;
        }

        public void DeleteMenu(string code)
        {
            throw new NotImplementedException();
        }
    }
}