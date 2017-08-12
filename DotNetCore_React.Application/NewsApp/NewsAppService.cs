using System;
using System.Collections.Generic;
using DotNetCore_React.Application.NewsApp.Dtos;
using DotNetCore_React.Domain.IRepositories;
using AutoMapper;
using DotNetCore_React.Domain.Entities;

namespace DotNetCore_React.Application.NewsApp
{
    public class NewsAppService : INewsAppService
    {
        private readonly INewsAppService _repository;


        public NewsAppService(INewsAppService repository)
        {
            _repository = repository;
        }

        public List<NewsDto> GetAll()
        {
            var a = _repository.GetAll();
            return Mapper.Map<List<NewsDto>>(a);
        }
        public NewsDto GetSingle(string id)
        {
           
            var a = _repository.GetSingle(id);
            return Mapper.Map<NewsDto>(a);
        }

        public Dictionary<string, object> Create(NewsDto role)
        {
            var myJson = new Dictionary<string, object>();

            var dateTime = DateTime.Now;
            var roleDB = new Role() {
                Id= Guid.NewGuid(),
                CreateDate = dateTime,
                UpdateDate = dateTime,
            };

            //儲存資料

            myJson.Add("success", true);
            myJson.Add("message", "");
            return myJson;
        }

        public Dictionary<string, object> Update(NewsDto role)
        {
            var myJson = new Dictionary<string, object>();
            //儲存資料

            myJson.Add("success", true);
            myJson.Add("message", "");
            return myJson;
        }

        public Dictionary<string, object> Delete(string id)
        {
            var myJson = new Dictionary<string, object>();

            //轉換Guid

            //刪除資料
            //var a = _repository
            //處理null狀況
            Guid guid;
            Guid.TryParse(id, out guid);
            myJson.Add("success", true);
            myJson.Add("message", "");
            return myJson;
        }
    }
}