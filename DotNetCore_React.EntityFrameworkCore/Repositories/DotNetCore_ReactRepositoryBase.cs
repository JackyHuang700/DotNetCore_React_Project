using System;
using DotNetCore_React.Domain.IRepositories;
using DotNetCore_React.Domain;


namespace DotNetCore_React.EntityFrameworkCore
{
   
        /// <summary>
        /// ��¦����
        /// </summary>
        public abstract class DotNetCore_ReactRepositoryBase<TEntity, TPrimaryKey> : IRepository<TEntity, TPrimaryKey> where TEntity : Entity<TPrimaryKey>
        {
            //�w�q�ƾڮw�X�ݤW�U��H
            protected readonly DotNetCore_ReactDBContext _dbContext;

            public DotNetCore_ReactRepositoryBase(DotNetCore_ReactDBContext dbContext)
            {
                _dbContext = dbContext;
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
        { }
    }

}