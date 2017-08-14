using System;
using System.Collections.Generic;
using DotNetCore_React.Application.NewsApp.Dtos;
using DotNetCore_React.Domain.IRepositories;
using AutoMapper;
using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Application.News_LanApp;

namespace DotNetCore_React.Application.NewsApp
{
    public class NewsAppService : INewsAppService
    {
        private readonly INewsRepository _repository;
        private readonly INews_LanRepository _repository_news_lan;


        public NewsAppService(INewsRepository repository, INews_LanRepository repository_news_lan)
        {
            _repository = repository;
            _repository_news_lan = repository_news_lan;
        }

        public List<NewsDto> GetAll()
        {
            var a = _repository.GetAll();

            //要撈子表
            return Mapper.Map<List<NewsDto>>(a);
        }
        public NewsDto GetSingle(string id)
        {

            //轉換Guid
            Guid guid;
            Guid.TryParse(id, out guid);
            var a = _repository.GetSingle(guid);
            return Mapper.Map<NewsDto>(a);
        }

        public Dictionary<string, object> Create(NewsDto role)
        {
            var myJson = new Dictionary<string, object>();

            var dateTime = DateTime.Now;

            //主表
            var roleDB = new News()
            {
                //Id = Guid.NewGuid(),
                //CreateDate = dateTime,
                //UpdateDate = dateTime,
            };
            myJson = _repository.Create(roleDB);
            //副表
            

            //儲存資料

            //myJson.Add("success", true);
            //myJson.Add("message", "");
            return myJson;
        }

        public Dictionary<string, object> Update(NewsDto role)
        {
            var myJson = new Dictionary<string, object>();

            var newsDB = Mapper.Map<News>(role);
            myJson = _repository.Update(newsDB);

            //myJson.Add("success", true);
            //myJson.Add("message", "");
            return myJson;
        }

        public Dictionary<string, object> Delete(string id)
        {
            var myJson = new Dictionary<string, object>();

            //轉換Guid
            Guid guid;
            Guid.TryParse(id, out guid);
            myJson = _repository.Delete(guid);

            //myJson.Add("success", true);
            //myJson.Add("message", "");
            return myJson;
        }
    }
}