using System;
using System.Collections.Generic;
using System.Linq;
using DotNetCore_React.Domain.IRepositories;
using DotNetCore_React.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DotNetCore_React.EntityFrameworkCore.Repositories
{
    public class NewsRepository : DotNetCore_ReactRepositoryBase<News>, INewsRepository
    {
        public NewsRepository(DotNetCore_ReactDBContext dbcontext) : base(dbcontext)
        {
        }

        public override void Delete(News entity)
        {
            //軟刪除
            entity.Status = -1;
            entity.UpdateDate = DateTime.Now;
            _dbContext.Set<News>().Update(entity);
            _dbContext.SaveChanges();
        }

        public override void Delete(Guid id)
        {
            var getData = base.Get(id);
            if (getData != null)
            {
                getData.Status = -1;
                getData.UpdateDate = DateTime.Now;
            }

            this.Delete(getData);
        }

        public new List<News> GetAllList()
        {
            return _dbContext.Set<News>().Where(c => c.Status != -1).ToList();
        }

    }
}
