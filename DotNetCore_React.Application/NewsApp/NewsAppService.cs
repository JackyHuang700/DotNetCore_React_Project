using System;
using System.Collections.Generic;
using DotNetCore_React.Application.NewsApp.Dtos;
using DotNetCore_React.Domain.IRepositories;
using AutoMapper;
using DotNetCore_React.Domain.Entities;
using DotNetCore_React.Application.News_LanApp;
using DotNetCore_React.Application.News_LanApp.Dtos;

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
            var newsDtoList = Mapper.Map<List<NewsDto>>(a);

            foreach (var item in newsDtoList)
            {
                //�������
                var new_lans_List = _repository_news_lan.Getall_By_NewsId(item.Id);
                item.New_LanList = Mapper.Map<List<News_LanDto>>(new_lans_List);
            }

            //�n���l��
            return newsDtoList;
        }
        public NewsDto GetSingle(string id)
        {

            //�ഫGuid
            Guid guid;
            Guid.TryParse(id, out guid);
            //����D��
            var a = _repository.GetSingle(guid);
            var newsDto = Mapper.Map<NewsDto>(a);
            //�������
            var new_lans_List = _repository_news_lan.Getall_By_NewsId(guid);
            newsDto.New_LanList = Mapper.Map<List<News_LanDto>>(new_lans_List);

            return newsDto;
        }

        public Dictionary<string, object> Create(NewsDto role)
        {
            var myJson_News = new Dictionary<string, object>();
            var myJson_News_Lan_List = new List<Dictionary<string, object>>();
            var myJson_Return = new Dictionary<string, object>();
            var errorList = new List<object>();
            var dateTime = DateTime.Now;

            //�D��
            var roleDB = new News()
            {
                //Id = Guid.NewGuid(),
                //CreateDate = dateTime,
                //UpdateDate = dateTime,
            };
            myJson_News = _repository.Create(roleDB);
            
            //�ƪ�
            foreach (var item in role.New_LanList)
            {
                var aa = Mapper.Map<News_Lan>(item); 
                myJson_News_Lan_List.Add(_repository_news_lan.Create(aa));
            }

            //�ˬd
            //�D��
            if (!(bool)myJson_News["success"])
            {
                errorList.Add(myJson_News["message"]);
            }
            //�ƪ�
            foreach (var aa in myJson_News_Lan_List)
            {
                if (!(bool)aa["success"])
                {
                    errorList.Add(myJson_News["message"]);
                }
            }


            if (errorList.Count == 0)
            {
                myJson_Return.Add("success", true);
                myJson_Return.Add("message", "");
            }
            else
            {
                //�R���D��
                _repository.Delete((Guid)myJson_News["message"]);
                //�R������
                foreach (var item in myJson_News_Lan_List)
                {
                    _repository_news_lan.Delete((Guid)myJson_News["message"]);
                }

                //�R����L���
                myJson_Return.Add("success", false);
                myJson_Return.Add("message", "����");
            }

            return myJson_Return;
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

            //�ഫGuid
            Guid guid;
            Guid.TryParse(id, out guid);
            myJson = _repository.Delete(guid);

            //myJson.Add("success", true);
            //myJson.Add("message", "");
            return myJson;
        }
    }
}