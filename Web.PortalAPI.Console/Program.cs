
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Utils;
using Tweetinvi;
using Tweetinvi.Models;
using Tweetinvi.Parameters;


namespace Web.PortalTwitter
{
    class Program
    {
        static Task t2;
        static void Main(string[] args)
        {
           t2 = TestAsync();
            Console.ReadLine();
        }
        static async Task TestAsync()
        {
            var userClient = new TwitterClient("WvY2JAq3P3uVfWWWoxM35qx0Z", "eIobMJHhhYOI7CXRuWsmbciGKy8GCPqIukUw7AHzQkGbElZT6u", "1327079480091840513-FyNQE5NSWfVIcgSRmFyUEdHKtiQQGN", "geGxNNmnQi3xXuZeBxtIrki2r369qorJcmqcfTo5rwL09");

            // request the user's information from Twitter API
            var user = await userClient.Users.GetAuthenticatedUserAsync();
            Console.WriteLine("Hello " + user);

            // publish a tweet
            var tweet = await userClient.Tweets.PublishTweetAsync("Hello tweetinvi world!");
            Console.WriteLine("You published the tweet : " + tweet);
     
        }
        // static void Main(string[] args)
        // {
        //     string ConsumerKey = "WvY2JAq3P3uVfWWWoxM35qx0Z";
        //     string ConsumerKeySecret = "eIobMJHhhYOI7CXRuWsmbciGKy8GCPqIukUw7AHzQkGbElZT6u";
        //     string AccessToken = "1327079480091840513-FyNQE5NSWfVIcgSRmFyUEdHKtiQQGN";
        //     string AccessTokenSecret = "geGxNNmnQi3xXuZeBxtIrki2r369qorJcmqcfTo5rwL09";
        //     //TweetinviEvents.BeforeExecutingRequest += (sender, args) =>
        //     //{
        //     //    System.Console.WriteLine(args.Url);
        //     //};

        //     var userClient = new TwitterClient("WvY2JAq3P3uVfWWWoxM35qx0Z", "eIobMJHhhYOI7CXRuWsmbciGKy8GCPqIukUw7AHzQkGbElZT6u", "1327079480091840513-FyNQE5NSWfVIcgSRmFyUEdHKtiQQGN", "geGxNNmnQi3xXuZeBxtIrki2r369qorJcmqcfTo5rwL09");
        //    Task.Run(async () =>
        //         {
        //             var user = await userClient.Users.GetAuthenticatedUserAsync();
        //             Console.WriteLine(user);
        //         });
        //     // request the user's information from Twitter API
        //     //   var user = await userClient.Users.GetAuthenticatedUserAsync();

        //     Console.WriteLine(user);    
        //     // publish a tweet
        //  //   var tweet = await userClient.Tweets.PublishTweetAsync("Hello tweetinvi world!");
        ////     Console.WriteLine("You published the tweet : " + tweet);
        //     System.Console.ReadLine();

        //     //      var twitter = new TwitterHelper(
        //     //ConsumerKey,
        //     //ConsumerKeySecret,

        //     //AccessToken,
        //     //AccessTokenSecret
        //     //);

        //     //      var rez = Task.Run(async () =>
        //     //      {
        //     //          var response = await twitter.TweetText("some another text", string.Empty);
        //     //          return response;
        //     //      });
        //     //      Console.WriteLine(rez.Result.Item1);
        //     //      var rezJson = JObject.Parse(rez.Result.Item2);
        //     //      Console.WriteLine(rezJson);
        //     //      string error = rezJson["errors"] == null ? "OK" : rezJson["errors"][0]["message"].Value<string>();
        //     //      Console.WriteLine(error);
        //     Console.ReadLine();
        // }
    }
}
