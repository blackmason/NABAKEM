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
            string sql = "SELECT CODE, P_CODE, NAME, URL, ENABLED, ROLE, MODIFIED, CREATED FROM MENUS ORDER BY ORDERING, CODE";

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
                    menus.Code = reader[0].ToString();
                    menus.ParentCode = reader[1].ToString();
                    menus.Name = reader[2].ToString();
                    menus.Url = reader[3].ToString();
                    menus.Enabled = reader[4].ToString();
                    menus.Role = reader[5].ToString();
                    menus.Modified = reader[6].ToString();
                    menus.Created = reader[7].ToString();
                    menuList.Add(menus);
                }
                connection.Close();
            }
            return menuList;
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
            string sql = string.Format("SELECT CODE, P_CODE, NAME, URL, ENABLED, ROLE FROM MENUS WHERE CODE = '{0}'", code);

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
                    menu.Enabled = reader[4].ToString();
                    menu.Role = reader[5].ToString();
                }
                connection.Close();
            }

            return menu;
        }

        public int AddMenu(string code, string name, string parentCode, string url, string role, string enabled)
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
                result = command.ExecuteNonQuery();
                connection.Close();
            }

            return result;
        }

        public int UpdateMenu(string code, string name, string parentCode, string url, string role, string enabled)
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
                command.Parameters.AddWithValue("@ROLE", role);
                command.Parameters.AddWithValue("@ENABLED", enabled);
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