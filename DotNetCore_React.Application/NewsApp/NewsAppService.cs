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

            //�n���l��
            foreach (var item in newsDtoList)
            {
                //�������
                var new_lans_List = _repository_news_lan.GetAllList(c => c.NewsId == item.Id);
                item.New_LanList = Mapper.Map<List<News_LanDto>>(new_lans_List);
            }

            return newsDtoList;
        }

        public NewsDto GetSingle(string id)
        {

            //�ഫGuid
            Guid guid;
            Guid.TryParse(id, out guid);
            //����D��
            var a = _repository.Get(guid);
            var newsDto = Mapper.Map<NewsDto>(a);
            //�������
            var new_lans_List = _repository_news_lan.GetAllList(c => c.NewsId == a.Id);
            newsDto.New_LanList = Mapper.Map<List<News_LanDto>>(new_lans_List);

            return newsDto;
        }

        public Dictionary<string, object> Create(NewsDto role)
        {
            var myJson_Return = new Dictionary<string, object>()
            {
                {"success",false },
                {"message",null  }
            };
            var news_lan_idList = new List<Guid>();
            var date = DateTime.Now;

            //�D��
            var roleDB = Mapper.Map<News>(role);
            roleDB.CreateDate = date;
            roleDB.UpdateDate = date;
            _repository.Insert(roleDB);
            var aSuccess = _repository.Save() > 0;

            //�ƪ�
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
                    myJson_Return["success"]=true;
                    myJson_Return["message"]= "";
                }
                else
                {
                    //�����ѴN�����R��
                    //�R���D��
                    _repository.Delete(roleDB);
                    _repository.Save();

                    //�R���ƪ�
                    _repository_news_lan.DeleteRange(news_lan_idList);
                    _repository_news_lan.Save();

                    myJson_Return["success"]= false;
                    myJson_Return["message"]= "����";
                }
            }

            return myJson_Return;
        }


        public Dictionary<string, object> Update(NewsDto role)
        {
            var myJson = new Dictionary<string, object>();

            //��s�D��
            var newsDB = Mapper.Map<News>(role);
            newsDB.UpdateDate = DateTime.Now;
            _repository.Update(newsDB);

            //��s�ƪ�
            var aaList = _repository_news_lan.GetAllList(c => c.NewsId == newsDB.Id);
            _repository_news_lan.UpdateRange(aaList);

            _repository.Save();
            _repository_news_lan.Save();
            return myJson;
        }

        public Dictionary<string, object> Delete(string id)
        {
            var myJson = new Dictionary<string, object>()
            {
                {"success",false },
                {"message",null  }
            };


            //�ഫGuid
            Guid guid;
            Guid.TryParse(id, out guid);

            var news_LanList = _repository_news_lan.GetAllList(c => c.NewsId == guid);
            //�R���l��
            _repository_news_lan.DeleteRange(news_LanList);
            var news_lan_effect = _repository_news_lan.Save() == news_LanList.Count;

            //�R���D��
            _repository.Delete(guid);
            var news_effect = _repository.Save() > 0;

            var success_effect = news_lan_effect && news_effect;
            myJson["success"] = success_effect;
            myJson["message"] = success_effect ? "�R�����\" : "�R������";

            return myJson;
        }
    }
}