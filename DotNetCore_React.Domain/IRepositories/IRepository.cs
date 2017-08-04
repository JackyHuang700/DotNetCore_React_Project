using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;


namespace DotNetCore_React.Domain.IRepositories
{
    //接口定義
    public interface IRepository
    {

    }

    //定义泛型仓储接口
    public interface IRepository<TEntity, TPrimaryKey> : IRepository where TEntity : Entity<TPrimaryKey>
    {

    }

    //默认Guid主键类型仓储
    public interface IRepository<TEntity> : IRepository<TEntity, Guid> where TEntity : Entity
    {

    }
}