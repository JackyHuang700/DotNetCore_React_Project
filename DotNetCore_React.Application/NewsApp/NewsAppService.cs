using System;
using System.Collections.Generic;
using DotNetCore_React.Application.NewsApp.Dtos;
using DotNetCore_React.Domain.IRepositories;
using AutoMapper;
using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Application.News_LanApp;
using DotNetCore_React.Application.News_LanApp.Dtos;
using System.Linq;

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
            var a = _repository.GetAllList();
            var newsDtoList = Mapper.Map<List<NewsDto>>(a);

            //要撈子表
            foreach (var item in newsDtoList)
            {
                //抓取附表
                var new_lans_List = _repository_news_lan.Getall_By_NewsId(item.Id);
                item.New_LanList = Mapper.Map<List<News_LanDto>>(new_lans_List);
            }

            return newsDtoList;
        }

        public NewsDto GetSingle(string id)
        {

            //轉換Guid
            Guid guid;
            Guid.TryParse(id, out guid);
            //抓取主表
            var a = _repository.Get(guid);
            var newsDto = Mapper.Map<NewsDto>(a);
            //抓取附表
            var new_lans_List = _repository_news_lan.GetAllList(c => c.NewsId == a.Id);
            newsDto.New_LanList = Mapper.Map<List<News_LanDto>>(new_lans_List);

            return newsDto;
        }

        public Dictionary<string, object> Create(NewsDto role)
        {
            var myJson_Return = new Dictionary<string, object>();
            var news_lan_idList = new List<Guid>();
            var date = DateTime.Now;

            //主表
            var roleDB = Mapper.Map<News>(role);
            roleDB.CreateDate = date;
            roleDB.UpdateDate = date;
            _repository.Insert(roleDB);
            var aSuccess = _repository.Save() > 0;

            //副表
            if (aSuccess)
            {
                foreach (var item in role.New_LanList)
                {
                    var aa = Mapper.Map<News_Lan>(item);
                    aa.NewsId = roleDB.Id;
                    var aaa = _repository_news_lan.Insert(aa);
                }

                var bSuccess = _repository_news_lan.Save() == role.New_LanList.Count;

                if (bSuccess)
                {
                    myJson_Return.Add("success", true);
                    myJson_Return.Add("message", "");
                }
                else
                {
                    //有失敗就全部刪除
                    //刪除主表
                    _repository.Delete(roleDB);
                    _repository.Save();

                    //刪除副表
                    _repository_news_lan.DeleteRange(news_lan_idList);
                    _repository_news_lan.Save();

                    myJson_Return.Add("success", false);
                    myJson_Return.Add("message", "失敗");
                }
            }

            return myJson_Return;
        }


        public Dictionary<string, object> Update(NewsDto role)
        {
            var myJson = new Dictionary<string, object>();

            //更新主表
            var newsDB = Mapper.Map<News>(role);
            newsDB.UpdateDate = DateTime.Now;
            _repository.Update(newsDB);

            //更新副表
            var aaList = _repository_news_lan.Getall_By_NewsId(newsDB.Id);
            _repository_news_lan.UpdateRange(aaList);

            _repository.Save();
            _repository_news_lan.Save();
            return myJson;
        }

        public Dictionary<string, object> Delete(string id)
        {
            var myJson = new Dictionary<string, object>();
            
            //轉換Guid
            Guid guid;
            Guid.TryParse(id, out guid);

            //刪除主表
            _repository.Delete(guid);
            _repository.Save();

            //刪除副表
            var news_LanList = _repository_news_lan.Getall_By_NewsId((Guid)myJson["id"]);

            //_repository_news_lan.DeleteRange(news_LanList.Select(o => o.Id).ToList());
            _repository_news_lan.Save();

            return myJson;
        }
    }
}