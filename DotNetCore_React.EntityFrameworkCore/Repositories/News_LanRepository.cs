using System;
using System.Collections.Generic;
using System.Linq;
using DotNetCore_React.Domain.IRepositories;
using DotNetCore_React.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class News_LanRepository : DotNetCore_ReactRepositoryBase<News_Lan>, INews_LanRepository
    {
        public News_LanRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {
        }

        public Dictionary<string, object> Create(News_Lan News_Lan)
        {
            var myJson = new Dictionary<string, object>();
            try
            {
                _dbContext.Add<News_Lan>(News_Lan);
                _dbContext.SaveChanges();
                myJson.Add("success", true);
                myJson.Add("message", "");
                myJson.Add("id", News_Lan.Id);
                return myJson;

            }
            catch (Exception ex)
            {
                myJson.Add("success", false);
                myJson.Add("message", ex.Message);
                return myJson;
            }
        }

        public Dictionary<string, object> Delete(Guid id)
        {
            var myJson = new Dictionary<string, object>();
            try
            {
                var News_Lan = this.GetSingle(id);
                _dbContext.Remove<News_Lan>(News_Lan);
                _dbContext.SaveChanges();
                myJson.Add("success", true);
                myJson.Add("message", "動作完成");
                return myJson;

            }
            catch (Exception ex)
            {
                myJson.Add("success", false);
                myJson.Add("message", ex.Message);
                return myJson;
            }
        }

        public List<News_Lan> GetAll()
        {
            return _dbContext.Set<News_Lan>().ToList();
        }

        public List<News_Lan> Getall_By_NewsId(Guid newsId)
        {
            return _dbContext.Set<News_Lan>().Where(c => c.NewsId == newsId).ToList();
        }

        public News_Lan GetSingle(Guid id)
        {
            return _dbContext.Set<News_Lan>().FirstOrDefault(C => C.Id == id);
        }

        public Dictionary<string, object> Update(News_Lan News_Lan)
        {
            var myJson = new Dictionary<string, object>();
            try
            {
                //參考 https://stackoverflow.com/questions/15336248/entity-framework-5-updating-a-record
                _dbContext.News_Lan.Attach(News_Lan);
                _dbContext.Entry(News_Lan).State = EntityState.Modified;
                _dbContext.SaveChanges();
                myJson.Add("success", true);
                myJson.Add("message", "");
                myJson.Add("id", News_Lan.Id);
                return myJson;

            }
            catch (Exception ex)
            {
                myJson.Add("success", false);
                myJson.Add("message", ex.Message);
                return myJson;
            }
        }
    }
}
