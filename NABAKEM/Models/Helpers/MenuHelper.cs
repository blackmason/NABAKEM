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
        /// <summary>
        /// 메뉴관리
        /// 전체메뉴 가져오기
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// 관리자메뉴-메뉴관리
        /// 부모메뉴 가져오기
        /// </summary>
        /// <returns></returns>
        public List<Menus> GetParentMenus()
        {
            string sql = "MENU_PARENTS_USP";
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

        /// <summary>
        /// 관리자메뉴-메뉴관리
        /// 선택된 메뉴 정보 가져오기
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public Menus GetMenu(string code)
        {
            string sql = "MENU_SELECT_USP";

            Menus menu = null;
            SetConnectionString();
            using (connection = new SqlConnection(connectionString))
            {
                connection.Open();
                command = new SqlCommand(sql, connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@CODE", code);
                reader = command.ExecuteReader();

                if (reader.Read())
                {
                    menu = new Menus();
                    menu.Code = reader["CODE"].ToString();
                    menu.Name = reader["NAME"].ToString();
                    menu.TypeCode = reader["TYPE_CD"].ToString();
                    menu.ParentCode = reader["P_CODE"].ToString();
                    menu.Url = reader["URL"].ToString();
                    menu.IsUse = reader["IS_USE"].ToString();
                    menu.Comment = reader["COMMENT"].ToString();
                    menu.Ordering = reader["ORDERING"].ToString();
                }
                connection.Close();
            }

            return menu;
        }
        
        /// <summary>
        /// 관리자메뉴-메뉴관리
        /// 메뉴를 추가한다.
        /// </summary>
        /// <param name="code"></param>
        /// <param name="name"></param>
        /// <param name="typeCode"></param>
        /// <param name="parentCode"></param>
        /// <param name="url"></param>
        /// <param name="isUse"></param>
        /// <param name="ordering"></param>
        /// <param name="comment"></param>
        /// <returns></returns>
        public int AddMenu(string code, string name, string typeCode, string parentCode, string url, string isUse, string ordering, string comment)
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
                command.Parameters.AddWithValue("@TYPE_CD", typeCode);
                command.Parameters.AddWithValue("@NAME", name);
                command.Parameters.AddWithValue("@URL", url);
                command.Parameters.AddWithValue("@IS_USE", isUse);
                command.Parameters.AddWithValue("@ORDERING", ordering);
                command.Parameters.AddWithValue("@COMMENT", comment);
                result = command.ExecuteNonQuery();
                connection.Close();
            }

            return result;
        }

        /// <summary>
        /// 관리자메뉴-메뉴관리
        /// 선택한 메뉴 정보를 수정한다.
        /// </summary>
        /// <param name="code"></param>
        /// <param name="name"></param>
        /// <param name="parentCode"></param>
        /// <param name="url"></param>
        /// <param name="isUse"></param>
        /// <param name="ordering"></param>
        /// <param name="comment"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 관리자메뉴-메뉴관리
        /// 메뉴그룹 전체 가져오기
        /// </summary>
        /// <returns></returns>
        public List<MenuGroups> GetAllMenuGroups()
        {
            string sql = "MENU_GROUP_ALL_USP";

            MenuGroups group;
            List<MenuGroups> mGroups;

            SetConnectionString();
            using (connection = new SqlConnection(connectionString))
            {
                connection.Open();
                command = new SqlCommand(sql, connection);
                reader = command.ExecuteReader();

                mGroups = new List<MenuGroups>();
                while (reader.Read())
                {
                    group = new MenuGroups();
                    group.Code = reader["CODE"].ToString();
                    group.Name = reader["NAME"].ToString();
                    group.IsUse = reader["IS_USE"].ToString();
                    group.AuthLevel = reader["AUTH_LVL"].ToString();
                    group.Ordering = reader["ORDERING"].ToString();
                    group.Comment = reader["COMMENT"].ToString();
                    group.Modified = reader["MODIFIED"].ToString();
                    group.Registered = reader["REGISTERED"].ToString();
                    mGroups.Add(group);
                }

                connection.Close();
            }

            return mGroups;
        }

        /// <summary>
        /// 관리자메뉴-메뉴관리
        /// 메뉴그룹을 추가한다.
        /// </summary>
        /// <param name="code"></param>
        /// <param name="name"></param>
        /// <param name="authLevel"></param>
        /// <param name="registered"></param>
        public void AddMenuGroup(string code, string name, int authLevel)
        {
            string sql = "MENU_GROUP_ADD_USP";

            SetConnectionString();
            using(connection = new SqlConnection(connectionString))
            {
                connection.Open();
                command = new SqlCommand(sql, connection);
                command.Parameters.AddWithValue("@CODE", code);
                command.Parameters.AddWithValue("@NAME", name);
                command.Parameters.AddWithValue("@AUTH_LVL", authLevel);
                command.ExecuteNonQuery();
                connection.Close();
            }

            return;
        }

        /// <summary>
        /// 관리자메뉴-메뉴관리
        /// 선택한 메뉴그룹 정보를 가져온다.
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public MenuGroups GetMenuGroup(string code)
        {
            string sql = string.Format("SELECT CODE, NAME, IS_USE, AUTH_LVL, ORDERING, COMMENT FROM MENU_GROUPS WHERE CODE = '{0}'", code);

            MenuGroups group = null;
            SetConnectionString();
            using (connection = new SqlConnection(connectionString))
            {
                connection.Open();
                command = new SqlCommand(sql, connection);
                reader =command.ExecuteReader();

                while (reader.Read())
                {
                    group = new MenuGroups();
                    group.Code = reader["CODE"].ToString();
                    group.Name = reader["NAME"].ToString();
                    group.IsUse = reader["IS_USE"].ToString();
                    group.AuthLevel = reader["AUTH_LVL"].ToString();
                    group.Ordering = reader["ORDERING"].ToString();
                    group.Comment = reader["COMMENT"].ToString();
                }

                connection.Close();
            }

            return group;
        }

        public void UpdateMenuGroup(string code, string name, string isUse, string authLevel, string ordering, string comment) 
        {
            string sql = "MENU_GROUP_UPDATE_USP";

            SetConnectionString();
            using (connection = new SqlConnection(connectionString))
            {
                connection.Open();
                command = new SqlCommand(sql, connection);
                command.Parameters.AddWithValue("@CODE",code);
                command.Parameters.AddWithValue("@NAME", name);
                command.Parameters.AddWithValue("@IS_USE", isUse);
                command.Parameters.AddWithValue("@AUTH_LVL", authLevel);
                command.Parameters.AddWithValue("@ORDERING", ordering);
                command.Parameters.AddWithValue("@COMMENT", comment);
                command.ExecuteNonQuery();
                connection.Close();
            }
        }


        /// <summary>
        /// 메뉴관리
        /// 서브메뉴 가져오기
        /// </summary>
        /// <returns></returns>
        //public List<Menus> GetSubMenus()
        //{
        //    string sql = "SELECT CODE, NAME FROM MENUS WHERE P_CODE != '0'";
        //    List<Menus> subMenuList;
        //    SetConnectionString();
        //    using (connection = new SqlConnection(connectionString))
        //    {
        //        connection.Open();
        //        command = new SqlCommand(sql, connection);
        //        reader = command.ExecuteReader();

        //        subMenuList = new List<Menus>();
        //        Menus menu;
        //        while (reader.Read())
        //        {
        //            menu = new Menus();
        //            menu.Code = reader[0].ToString();
        //            menu.Name = reader[1].ToString();
        //            subMenuList.Add(menu);
        //        }

        //        connection.Close();
        //    }

        //    return subMenuList;
        //}

        public void DeleteMenu(string code)
        {
            throw new NotImplementedException();
        }




    }
}