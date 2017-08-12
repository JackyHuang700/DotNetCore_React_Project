using System;
using System.Collections.Generic;
using System.Linq;
using DotNetCore_React.Domain.IRepositories;
using DotNetCore_React.Domain.Entities;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class NewsRepository : DotNetCore_ReactRepositoryBase<News>, INewsRepository
    {
        public NewsRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {
        }

        public Dictionary<string, object> Create(News news)
        {
            var myJson = new Dictionary<string, object>();
            try
            {
                _dbContext.Add<News>(news);
                _dbContext.SaveChanges();
                myJson.Add("success", true);
                myJson.Add("message", "");
                myJson.Add("id", news.Id);
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
                var news = this.GetSingle(id);
                _dbContext.Remove<News>(news);
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

        public List<News> GetAll()
        {
            return _dbContext.Set<News>().ToList();
        }

        public News GetSingle(Guid id)
        {
            return _dbContext.Set<News>().FirstOrDefault(C => C.Id == id);
        }

        public Dictionary<string, object> Update(News news)
        {
            var myJson = new Dictionary<string, object>();
            try
            {
                //參考 https://stackoverflow.com/questions/15336248/entity-framework-5-updating-a-record
                _dbContext.News.Attach(news);
                var entry = _dbContext.Entry(news);
                _dbContext.SaveChanges();
                myJson.Add("success", true);
                myJson.Add("message", "");
                myJson.Add("id", news.Id);
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
