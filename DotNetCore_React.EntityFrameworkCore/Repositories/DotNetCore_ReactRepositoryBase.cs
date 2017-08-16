using System;
using DotNetCore_React.Domain.IRepositories;
using DotNetCore_React.Domain;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Linq;
using System.Collections.Generic;

namespace DotNetCore_React.EntityFrameworkCore
{

    /// <summary>
    /// 基礎類型
    /// </summary>
    public abstract class DotNetCore_ReactRepositoryBase<TEntity, TPrimaryKey> : IRepository<TEntity, TPrimaryKey> where TEntity : Entity<TPrimaryKey>
    {
        //定義數據庫訪問上下對象
        protected readonly DotNetCore_ReactDBContext _dbContext;

        public DotNetCore_ReactRepositoryBase(DotNetCore_ReactDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        /// <summary>
        /// 获取实体集合
        /// </summary>
        /// <returns></returns>
        public List<TEntity> GetAllList()
        {
            return _dbContext.Set<TEntity>().ToList();
        }

        /// <summary>
        /// 根据lambda表达式条件获取实体集合
        /// </summary>
        /// <param name="predicate">lambda表达式条件</param>
        /// <returns></returns>
        public List<TEntity> GetAllList(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbContext.Set<TEntity>().Where(predicate).ToList();
        }

        /// <summary>
        /// 根据主键获取实体
        /// </summary>
        /// <param name="id">实体主键</param>
        /// <returns></returns>
        public TEntity Get(TPrimaryKey id)
        {
            return _dbContext.Set<TEntity>().FirstOrDefault(CreateEqualityExpressionForId(id));
        }

        /// <summary>
        /// 根据lambda表达式条件获取单个实体
        /// </summary>
        /// <param name="predicate">lambda表达式条件</param>
        /// <returns></returns>
        public TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbContext.Set<TEntity>().FirstOrDefault(predicate);
        }

        /// <summary>
        /// 新增实体
        /// </summary>
        /// <param name="entity">实体</param>
        /// <returns></returns>
        public TEntity Insert(TEntity entity)
        {
            _dbContext.Set<TEntity>().Add(entity);
            return entity;
        }

        /// <summary>
        /// 更新实体
        /// </summary>
        /// <param name="entity">实体</param>
        public TEntity Update(TEntity entity)
        {
            _dbContext.Set<TEntity>().Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
            return entity;
        }

        public List<TEntity> UpdateRange(List<TEntity> entityList)
        {
            foreach (var entity in entityList)
            {
                _dbContext.Set<TEntity>().Attach(entity);
                _dbContext.Entry(entity).State = EntityState.Modified;
            }
            return entityList;
        }


        /// <summary>
        /// 新增或更新实体
        /// </summary>
        /// <param name="entity">实体</param>
        public TEntity InsertOrUpdate(TEntity entity)
        {
            if (Get(entity.Id) != null)
                return Update(entity);
            return Insert(entity);
        }


        public abstract void Delete(TEntity entity);

        public abstract void Delete(TPrimaryKey id);


        ///// <summary>
        ///// 删除实体
        ///// </summary>
        ///// <param name="entity">要删除的实体</param>
        //public void Delete(TEntity entity)
        //{
        //    //真刪除
        //    _dbContext.Set<TEntity>().Remove(entity);
        //}

        ///// <summary>
        ///// 删除实体
        ///// </summary>
        ///// <param name="id">实体主键</param>
        //public void Delete(TPrimaryKey id)
        //{
        //    _dbContext.Set<TEntity>().Remove(Get(id));
        //}

        ///// <summary>
        ///// 删除实体
        ///// </summary>
        ///// <param name="id">实体主键</param>
        //public void DeleteRange(List<TPrimaryKey> id)
        //{
        //    foreach (var i in id)
        //    {
        //        _dbContext.Set<TEntity>().Remove(Get(i));
        //    }
        //}


        /// <summary>
        /// 事务性保存
        /// </summary>
        public int Save()
        {
            return _dbContext.SaveChanges();
        }

        /// <summary>
        /// 根据主键构建判断表达式
        /// </summary>
        /// <param name="id">主键</param>
        /// <returns></returns>
        protected static Expression<Func<TEntity, bool>> CreateEqualityExpressionForId(TPrimaryKey id)
        {
            var lambdaParam = Expression.Parameter(typeof(TEntity));
            var lambdaBody = Expression.Equal(
                Expression.PropertyOrField(lambdaParam, "Id"),
                Expression.Constant(id, typeof(TPrimaryKey))
                );

            return Expression.Lambda<Func<TEntity, bool>>(lambdaBody, lambdaParam);
        }

       
    }

    public abstract class DotNetCore_ReactRepositoryBase<TEntity> : DotNetCore_ReactRepositoryBase<TEntity, Guid> where TEntity : Entity
    {
        public DotNetCore_ReactRepositoryBase(DotNetCore_ReactDBContext dbContext) : base(dbContext)
        { }
    }


    public abstract class DotNetCore_ReactRepositoryBase_Int<TEntity> : DotNetCore_ReactRepositoryBase<TEntity, int> where TEntity : Entity_Int
    {
        public DotNetCore_ReactRepositoryBase_Int(DotNetCore_ReactDBContext dbContext) : base(dbContext)
        {

        }


    }

}