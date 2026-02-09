import { http, HttpResponse } from 'msw';

export const handlers = [
  // YahooニュースRSSフィードのモック
  http.get('https://news.yahoo.co.jp/rss/media/stv/all.xml', () => {
    const rssResponse = `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
      <rss version="2.0">
          <channel>
              <language>ja</language>
              <copyright>© LY Corporation</copyright>
              <pubDate>Sat, 13 Dec 2025 13:36:09 GMT</pubDate>
              <title>STVニュース北海道 - Yahoo!ニュース</title>
              <link>https://news.yahoo.co.jp/media/stv?source=rss</link>
              <description>Yahoo! JAPANのニュースに掲載されている記事の最新の見出しを提供しています。</description>
              <image>
                  <title>Yahoo!ニュース</title>
                  <link>https://news.yahoo.co.jp/</link>
                  <url>https://s.yimg.jp/images/news/yjnews_s.gif</url>
                  <width>101</width>
                  <height>18</height>
              </image>
              <item>
                  <title>アパートの屋根の雪下ろし中に転落か　30代とみられる男性が頭部から出血し病院搬送　北海道深川市(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/4ae11cbf6c6d8bbf7ccb1641050a82219e5efed4?source=rss</link>
                  <pubDate>Sat, 13 Dec 2025 12:05:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251213-08778797-stv-000-4-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/4ae11cbf6c6d8bbf7ccb1641050a82219e5efed4/comments</comments>
                  <description>
                      2025年12月13日午後1時半ごろ、北海道深川市5条にある2階建てアパートの敷地内で、雪の上に倒れている男性が発見されました。
                      
                      警察によりますと、倒れていた男性は30代とみられ、このアパートの住人
                  </description>
              </item>
              <item>
                  <title>【速報】激しく立ち上る煙　札幌中心部の居酒屋と歯科医院が入るビルから出火 けが人の情報なし(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/32facf8e6a329e553d523fcdd1f240c79c06b70c?source=rss</link>
                  <pubDate>Sat, 13 Dec 2025 10:38:01 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251213-04828412-stv-000-3-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/32facf8e6a329e553d523fcdd1f240c79c06b70c/comments</comments>
                  <description>
                      2025年12月13日夕方、北海道札幌市中心部で、居酒屋と歯科医院が入るビルが燃える火事がありました。
                      
                      警察によりますと、けが人の情報は入っていないということです。
                      
                      火事があったのは札幌市中央区南
                  </description>
              </item>
              <item>
                  <title>あす航空事故調査官を派遣へ　インドネシアから来たプライベート機が滑走路逸脱　重大インシデント(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/acc958d82510d8eb64abfe3bf6c28f94d8c0bf72?source=rss</link>
                  <pubDate>Sat, 13 Dec 2025 09:23:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251213-01458337-stv-000-2-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/acc958d82510d8eb64abfe3bf6c28f94d8c0bf72/comments</comments>
                  <description>
                      新千歳空港できのうプライベートジェット機が滑走路を逸脱した事故について国土交通省は「重大インシデント」に認定し、あす事故調査官を派遣する見込みです。
                      
                      ON 松田カメラマン「新千歳空港B滑走路の北端で
                  </description>
              </item>
              <item>
                  <title>陸別で－２４．７℃　今シーズン最も厳しい寒さ　新千歳空港ではけさまでに７５０人が一夜を明かす(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/92cd901a247bef21e18575c084f9f4e7df12f9c0?source=rss</link>
                  <pubDate>Sat, 13 Dec 2025 09:02:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251213-04237389-stv-000-2-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/92cd901a247bef21e18575c084f9f4e7df12f9c0/comments</comments>
                  <description>
                      上空の寒気の影響で十勝の陸別町では今シーズン最も低い気温となりました。
                      
                      また雪で欠航が相次いだ新千歳空港では、けさまでにおよそ750人が空港内で一夜を明かしました。
                      
                      （松本カメラマン）「朝6時の陸
                  </description>
              </item>
              <item>
                  <title>スキージャンプ 一戸くる実 名寄で切り替えV「クヨクヨしててももったいない」(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/e822c5a0ebde280fdf25ea61928add1410043505?source=rss</link>
                  <pubDate>Sat, 13 Dec 2025 07:36:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251213-01787449-stv-000-2-view.jpg?pri=l&amp;w=450&amp;h=337&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/e822c5a0ebde280fdf25ea61928add1410043505/comments</comments>
                  <description>
                      ＜スキージャンプ 名寄ピヤシリジャンプ大会＞
                      毎年、全国各地のスキージャンパーが名寄に集うジャンプ2連戦が今日開幕した。
                      男女合わせて122人のジャンパーがエントリーした今日の大会。女子組は21歳の一
                  </description>
              </item>
              <item>
                  <title>JR北海道 あす雪の影響で特急オホーツク３号４号など一部列車を計画運休　広い範囲で雪の予報(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/c6d87b4a562d318cd083451292f83d42484e314d?source=rss</link>
                  <pubDate>Sat, 13 Dec 2025 07:09:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251213-03517874-stv-000-2-view.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/c6d87b4a562d318cd083451292f83d42484e314d/comments</comments>
                  <description>
                      JR北海道は、雪による輸送障害が見込まれることからあす（１２月１４日）一部列車を運休します。
                      
                      【運休19本】
                      ＜特急＞2本
                      札幌　午後3時30分発　網走行き　特急オホーツク3号
                      網走　 午後2時36
                  </description>
              </item>
              <item>
                  <title>【重大インシデント】右側プロペラエンジン停止し緊急着陸 じつは左側も一時的に推力低下していた(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/20613a9e0a4baaddecbafdc03f490177c9080449?source=rss</link>
                  <pubDate>Sat, 13 Dec 2025 06:01:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251213-07184178-stv-000-2-view.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/20613a9e0a4baaddecbafdc03f490177c9080449/comments</comments>
                  <description>
                      丘珠空港から秋田空港に向かっていた北海道エアシステムの旅客機が離陸直後に右側のプロペラが停止し函館空港に緊急着陸したトラブルで、左側エンジンの推力も一時的に低下していていたことがわかりました。
                      
                      緊急
                  </description>
              </item>
              <item>
                  <title>ＪＲ北海道 作業員２人が“ルール違反”　列車の見張り業務に専念せず踏切の除雪作業に加わる　(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/fbfa08a991415788d03e7f77dfe78ea8269be1b4?source=rss</link>
                  <pubDate>Sat, 13 Dec 2025 04:30:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251213-07552746-stv-000-2-view.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/fbfa08a991415788d03e7f77dfe78ea8269be1b4/comments</comments>
                  <description>
                      JR北海道は、列車の見張り員2人が社内ルールに違反して業務に専念せず、踏切の除雪作業に加わっていたことを明らかにしました。
                      
                      JR北海道によりますと、保線所の作業員5人は、2025年11月18日午前1
                  </description>
              </item>
              <item>
                  <title>札幌市白石区でアパートが燃える火事　高齢男性２人搬送もそのうち８０代とみられる男性死亡　(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/51275e2f3717539b3f3bdbb646fa08327c983dc5?source=rss</link>
                  <pubDate>Sat, 13 Dec 2025 03:26:01 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251213-02535352-stv-000-2-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/51275e2f3717539b3f3bdbb646fa08327c983dc5/comments</comments>
                  <description>
                      北海道札幌市白石区でけさ、アパートが燃える火事があり火はおよそ2時間後に消し止められましたが、2階の1室が全焼しました。
                      
                      この火事で80代とみられる高齢男性が病院に搬送されましたがその後死亡が確認さ
                  </description>
              </item>
              <item>
                  <title>札幌の木造アパートで火事 　２階の１室全焼し高齢男性2人病院搬送 そのうち80代男性死亡(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/771257fa76c35ccd415b895805cc61b99fc04962?source=rss</link>
                  <pubDate>Sat, 13 Dec 2025 01:36:01 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251213-02362352-stv-000-2-view.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/771257fa76c35ccd415b895805cc61b99fc04962/comments</comments>
                  <description>
                      2025年12月13日午前7時すぎ札幌市白石区平和通にある木造2階建てのアパートが燃える火事がありました。
                      
                      消防によりますと、この火事でアパートに住む80代とみられる男性1人が意識不明の重体で病院に
                  </description>
              </item>
              <item>
                  <title>新千歳空港でプライベートジェットが滑走路逸脱　運輸安全委が「重大インシデント」に認定(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/7213ec2d92ecd0920b6440e27821a5def9c0647e?source=rss</link>
                  <pubDate>Sat, 13 Dec 2025 01:09:01 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251213-04645812-stv-000-5-view.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/7213ec2d92ecd0920b6440e27821a5def9c0647e/comments</comments>
                  <description>
                      国土交通省は2025年12月12日午後6時半すぎに新千歳空港でプライベートジェット機が滑走路を逸脱し停止した事故について、重大インシデントにあたると発表しました。
                      
                      プライベートジェット機はインドネシ
                  </description>
              </item>
              <item>
                  <title>“中止前提”のクリスマスイベント「命が大事、良い対応」道内観光地で進む災害対応　後発地震に備える(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/9d86cb90e58ca02716f0fd7ab3b1202d604ba79f?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 23:00:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251213-09785939-stv-000-1-view.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/9d86cb90e58ca02716f0fd7ab3b1202d604ba79f/comments</comments>
                  <description>
                      北海道内では引き続き、大規模な地震が起こる可能性があることから「後発地震注意情報」が出されています。
                      
                      大勢の人が訪れる観光地はどのような対応をとっているのでしょうか。
                      
                      函館の冬を代表するイベント「
                  </description>
              </item>
              <item>
                  <title>最先端半導体の研究開発拠点「活性化に大きな効果期待」ラピダスの工場建設進む千歳市に整備へ(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/a2095421f87b3b96195931020e7812e8468f3ccb?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 22:31:25 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251213-03931695-stv-000-1-view.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/a2095421f87b3b96195931020e7812e8468f3ccb/comments</comments>
                  <description>
                      経済産業省は12月12日、半導体メーカー「ラピダス」の工場建設が進む北海道千歳市に、最先端半導体の研究開発拠点を整備すると発表しました。
                      
                      この研究開発拠点は、次世代EUV（極端紫外線）露光装置を導入
                  </description>
              </item>
              <item>
                  <title>鋼と格闘「刀づくり」鉄のマチに代々つなぐ技術　廃業が相次ぐ伝統工芸「和紙」の魅力を未来へ(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/49ec7765b09da70fad877e2b5cef175f3d57d788?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 22:23:23 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251213-03977191-stv-000-1-view.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/49ec7765b09da70fad877e2b5cef175f3d57d788/comments</comments>
                  <description>
                      北海道の未来を考える「みらいＷＥＥＫ」。
                      
                      きょうは日本の伝統技術です。
                      
                      国内でも数少ない刀を作る職人「刀匠」が室蘭市にいます。
                      
                      代々受け継いできた技術を未来へつなごうとする人たちを取材しました。
                  </description>
              </item>
              <item>
                  <title>突然LINEで“投資家”から連絡　40代男性…約1億1600万円だまし取られる　北海道(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/176390b5873a1458070ba86bcb0126655a895ca7?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 21:12:12 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251213-03761419-stv-000-2-view.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/176390b5873a1458070ba86bcb0126655a895ca7/comments</comments>
                  <description>
                      北海道・札幌方面手稲警察署は2025年12月12日、札幌市手稲区に住む40代男性が現金約1億1600万円をだまし取られるSNS型投資詐欺事件が発生したと発表しました。
                      
                      2025年8月13日、札幌市手
                  </description>
              </item>
              <item>
                  <title>【中継】帰宅時間の高速道路　一部が吹雪で通行止めに　週末も天候悪化…警報級の風の予想も　北海道(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/a829700d4e692f6cf1ff437e6d5c88349869b578?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 13:00:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-09681673-stv-000-1-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/a829700d4e692f6cf1ff437e6d5c88349869b578/comments</comments>
                  <description>
                      年に数回レベルの非常に強い寒気が上空に流れ込んでいる影響で、北海道内は厳しい寒さに加えて日本海側を中心に雪や風が強まりました。
                      
                      １２月１１日から断続的に雪が降り続いている北広島市から中継です。
                      
                      北
                  </description>
              </item>
              <item>
                  <title>新千歳空港もホワイトアウト　欠航相次ぐ…今季一番の寒さ　道内１７３地点で真冬日　交通障害に注意(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/b3ea1deeeb2b4e61da3803a3ed92edba7bade48e?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 12:00:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-02836584-stv-000-2-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/b3ea1deeeb2b4e61da3803a3ed92edba7bade48e/comments</comments>
                  <description>
                      年に数回レベルの非常に強い寒気が上空に流れ込んでいる影響で、北海道内は厳しい寒さに加えて日本海側を中心に雪や風が強まりました。
                      
                      道北の留萌市では１２月１２日朝、強い風と雪で一時、ホワイトアウト状態と
                  </description>
              </item>
              <item>
                  <title>【午後8時5分運転再開】札幌市電 大雪の影響で一部区間で運転見合わせ(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/85aa903cf6b33ceaf292d3d699f5adae44b439ca?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 11:49:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-09378257-stv-000-4-view.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/85aa903cf6b33ceaf292d3d699f5adae44b439ca/comments</comments>
                  <description>
                      2025年12月12日夕方からの強い雪の影響で一部区間で運転を見合わせていた札幌市の路面電車は午後8時5分に全線で運転を再開しました。
                      
                      路面電車は雪の影響で午後6時すぎから西4丁目と静修学園前での折
                  </description>
              </item>
              <item>
                  <title>シンガポールからのプライベートジェットが“オーバーラン”滑走路閉鎖も他便への影響なし　新千歳空港(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/a2e9391bc79661b792aec70b2f6b0f3cf2ad5450?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 11:37:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-09361252-stv-000-3-view.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/a2e9391bc79661b792aec70b2f6b0f3cf2ad5450/comments</comments>
                  <description>
                      消防によりますと、2025年12月12日午後6時半ごろ、新千歳空港の滑走路でプライベートジェットがオーバーランしたということです。
                      
                      新千歳空港航空消防隊から消防に「機体は不明だが、オーバーランした機
                  </description>
              </item>
              <item>
                  <title>【中継】細かい雪巻き上げ「突然真冬のようになった」降雪量・道内２位の留萌市から　北海道(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/39118c1b017eebb4dc20e53a3b64fd7796163574?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 11:01:01 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-01944192-stv-000-1-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/39118c1b017eebb4dc20e53a3b64fd7796163574/comments</comments>
                  <description>
                      年に数回レベルの非常に強い寒気が上空に流れ込んでいる影響で、北海道内は厳しい寒さに加えて日本海側を中心に雪や風が強まりました。
                      
                      １２月１２日午後５時までの降雪量が道内で２番目に多くなっている留萌市か
                  </description>
              </item>
              <item>
                  <title>【続報】プライベートジェットが滑走路をオーバーラン　乗客乗員合わせて９人　新千歳空港・北海道(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/118f399fc2dbfadf6f356437396322063cfd1edb?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 10:39:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-02992933-stv-000-7-view.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/118f399fc2dbfadf6f356437396322063cfd1edb/comments</comments>
                  <description>
                      消防によりますと、2025年12月12日午後6時半ごろ、新千歳空港のB滑走路でプライベートジェットがオーバーランしたということです。
                      
                      新千歳空港航空消防隊から消防に「機体は不明だが、オーバーランした
                  </description>
              </item>
              <item>
                  <title>【速報】滑走路から航空機逸脱か　消防が確認中　新千歳空港・北海道(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/c863bf6cb7ef26f4943dcd1e2a871fd91cb36e50?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 10:34:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-04262124-stv-000-6-view.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/c863bf6cb7ef26f4943dcd1e2a871fd91cb36e50/comments</comments>
                  <description>
                      消防によりますと、新千歳空港で2025年12月12日午後6時38分、航空機が滑走路から逸脱したと国土交通省航空局から消防に通報がありました。
                      
                      けが人はいないということです。
                      
                      消防が詳細を確認してい
                  </description>
              </item>
              <item>
                  <title>【続報】路面電車に長い列　大雪影響で一部運転見合わせ　西４丁目駅で折り返し運転中　札幌市(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/ce7f5f150ceab92221be5886bc48ac4d410b0b9f?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 10:10:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-07922411-stv-000-3-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/ce7f5f150ceab92221be5886bc48ac4d410b0b9f/comments</comments>
                  <description>
                      札幌の路面電車の一部区間が大雪のため運転見合わせとなっています。
                      
                      現在、西４丁目からすすきのを経由して静修学園前までの両方向で運転を見合わせています。
                      
                      こちらは西4丁目の駅なんですけれども、ここで
                  </description>
              </item>
              <item>
                  <title>【解説】JRダイヤ改正　道内の特急すべて「指定席」ネット予約などに割引サービスを集約　北海道(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/18dced4f05dce814303ccb4196e07f84a8d1eda1?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 09:51:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-01558762-stv-000-1-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/18dced4f05dce814303ccb4196e07f84a8d1eda1/comments</comments>
                  <description>
                      ＪＲ北海道の２０２６年３月のダイヤ改正の詳しい内容です。
                      
                      旭川方面を走る「ライラック」や「宗谷」などが全席指定席となり、道内の特急すべてが「指定席」となります。
                      
                      ＳきっぷやＲきっぷといった往復割引
                  </description>
              </item>
              <item>
                  <title>【速報】札幌の路面電車　西４丁目～静修学園前で運転見合わせ　大雪の影響　再開の見通し立たず(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/4a6ef5dc334e9013b080354ec61e1c22a67d668b?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 09:49:01 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-05455465-stv-000-1-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/4a6ef5dc334e9013b080354ec61e1c22a67d668b/comments</comments>
                  <description>
                      札幌の路面電車の一部区間が雪のため運転見合わせとなっています。
                      
                      運転を見合わせている区間は、狸小路やすすきのなどがある西４丁目から静修学園前の内回りコースです。
                      
                      再開の見通しのめどは立っていません
                  </description>
              </item>
              <item>
                  <title>旭川方面の特急が全車指定席　往復割引きっぷも廃止「かなりしんどい」サービス集約へ　JR北海道(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/cfa6e84a8b92be79369ee41d01f370310251ca96?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 09:46:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-01668714-stv-000-2-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/cfa6e84a8b92be79369ee41d01f370310251ca96/comments</comments>
                  <description>
                      ＪＲ北海道は、２０２６年３月のダイヤ改正の内容を発表しました。
                      
                      旭川方面を走る特急列車が全席指定席となり、ＳきっぷやＲきっぷといった往復割引も廃止となります。
                      
                      （ＪＲ北海道鉄道事業本部　佐藤一朗運
                  </description>
              </item>
              <item>
                  <title>防寒着を着て給食食べる児童「避難できるよう準備」北海道で震度４観測　一時、津波注意報発表(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/dce5da5f4ede40c1c555e0a5ac6f2b4c11c1a17d?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 09:29:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-02492978-stv-000-1-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/dce5da5f4ede40c1c555e0a5ac6f2b4c11c1a17d/comments</comments>
                  <description>
                      （岡本アナウンサー）「いま緊急地震速報が発表されました」
                      
                      １２月１２日午前１１時４４分、再び北海道を襲った強い揺れ。
                      
                      （東海林記者）「１１時４５分です。函館市内でも揺れを感じます。少し強い揺れです
                  </description>
              </item>
              <item>
                  <title>【ファイターズ】現役ドラフトで加入の菊地大稀が入団会見「もっともっとファイターズファンを熱くできるように」(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/56dc62d7a8e28a1b585305857183c004de106b1f?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 08:56:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-07345484-stv-000-3-view.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/56dc62d7a8e28a1b585305857183c004de106b1f/comments</comments>
                  <description>
                      ファイターズは１２日(金)、現役ドラフトでジャイアンツから加入した菊地大稀投手の入団会見をエスコンフィールドHOKKAIDOで開きました。背番号は「５５」に決定。
                      菊地投手はプロ４年間でリリーフとして
                  </description>
              </item>
              <item>
                  <title>今週は５人死亡「交通死亡事故多発警報」発表　多くはスリップが原因　慎重な運転呼びかけ　道警(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/b512f05e46a0c720628f2ae26b9847ee95bb4dd4?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 08:31:01 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-07611864-stv-000-1-view.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/b512f05e46a0c720628f2ae26b9847ee95bb4dd4/comments</comments>
                  <description>
                      北海道内では今週、交通事故で５人が死亡しています。
                      
                      道は「交通死亡事故多発警報」を発表し、スリップ事故防止などを呼びかけています。
                      
                      札幌市東区で１２月８日、ダンプカーと乗用車が正面衝突し１人が死亡
                  </description>
              </item>
              <item>
                  <title>道内の大学進学率…全国平均下回る　教育格差是正へ地域の金融機関と大学が連携協定　北海道(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/5e220de89bcbb4340f3d62964a61ac98b24161b6?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 08:24:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-09919883-stv-000-1-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/5e220de89bcbb4340f3d62964a61ac98b24161b6/comments</comments>
                  <description>
                      地域の未来を担う人材の育成を目的に、大学と地域の金融機関が連携協定を結び、新たなプロジェクトが発表されました。
                      
                      包括連携協定を締結したのは、北海学園大学と札幌中央信用組合です。
                      
                      道内の大学進学率は
                  </description>
              </item>
              <item>
                  <title>【中継】積雪は約30センチ　除雪が進んでいない住宅街も　しんしんと雪降り続く札幌市清田区(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/8063f141dc87cda4706f1d79d5e4620e163be403?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 08:22:01 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-06553744-stv-000-2-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/8063f141dc87cda4706f1d79d5e4620e163be403/comments</comments>
                  <description>
                      年に数回レベルの非常に強い寒気が上空に流れ込んでいる影響で、北海道内は厳しい寒さに加えて日本海側を中心に雪や風が強まっています。
                      
                      札幌市清田区から中継です。
                      
                      この時間も雪がしんしんと降り続いていま
                  </description>
              </item>
              <item>
                  <title>肌がヒリヒリ…凍てつく寒さ　断続的に雪降り続く北広島市　積雪29センチ…凍結路面に注意(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/91bed461ddbee37b8260c53520ec6e37ca545ec3?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 07:27:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-01978642-stv-000-2-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/91bed461ddbee37b8260c53520ec6e37ca545ec3/comments</comments>
                  <description>
                      年に数回レベルの非常に強い寒気が上空に流れ込んでいる影響で、北海道内は厳しい寒さに加えて日本海側を中心に雪や風が強まっています。
                      
                      １２月１１日から断続的に雪が降り続いている北広島市から中継です。
                  </description>
              </item>
              <item>
                  <title>【中継】氷点下４度の広尾町　一時「津波注意報」発表　町民から避難の問い合わせ“増加”　北海道(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/ee888b80352fcf768d0383d9df979075dbd9822a?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 07:25:01 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-08198543-stv-000-2-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/ee888b80352fcf768d0383d9df979075dbd9822a/comments</comments>
                  <description>
                      一時、津波注意報が出された北海道広尾町から中継です。
                      
                      広尾町の十勝港です。
                      
                      まもなく日が暮れようとしています。
                      
                      津波注意報はすでに解除され、港では時折、トラックやトレーラーが出入りする姿も見られ
                  </description>
              </item>
              <item>
                  <title>「揺れが長くて心配だった」再び北海道を襲った強い揺れ　20センチの津波観測も　注意呼びかけ(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/945e01ac7c37f15acf3ea9a6436cdaa8a6fa5b49?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 07:19:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-01787521-stv-000-3-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/945e01ac7c37f15acf3ea9a6436cdaa8a6fa5b49/comments</comments>
                  <description>
                      （岡本アナウンサー）「いま緊急地震速報が発表されました」
                      
                      １２月１２日午前１１時４４分、再び北海道を襲った強い揺れ。
                      
                      （東海林記者）「１１時４５分です。函館市内でも揺れを感じます。少し強い揺れです
                  </description>
              </item>
              <item>
                  <title>【専門家解説】最大震度４「きょうは大きめの余震」引き続き地震と津波の備えを　北海道で津波注意報(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/f95fc44cbf4adf293977447a08b3386ee966a9f4?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 07:17:01 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-03157974-stv-000-3-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/f95fc44cbf4adf293977447a08b3386ee966a9f4/comments</comments>
                  <description>
                      地震の今後の見通しについて専門家に聞きました。
                      
                      北海道大学の高橋浩晃教授です。
                      
                      引き続き後発地震への注意を呼び掛けています。
                      
                      （北海道大学　高橋浩晃教授）「１２月８日のような大きな地震が起きると
                  </description>
              </item>
              <item>
                  <title>【交通情報】道央道で通行止め発生　登別東IC～白老ICの間で上下線　北海道太平洋中部などに津波注意報(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/a28ed988ce2bec5146b6a709d70bd33ce2abb564?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 04:18:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-07927842-stv-000-3-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/a28ed988ce2bec5146b6a709d70bd33ce2abb564/comments</comments>
                  <description>
                      交通情報です。
                      
                      NEXCO東日本は道央自動車道の登別東IC～白老ICの間を上下線ともに通行止めにしています。
                      
                      職員による点検を行い、安全が確認され次第、解除するとしています。
                      
                      JR北海道によりま
                  </description>
              </item>
              <item>
                  <title>【交通情報】JRや札幌市営地下鉄で一時運転停止　新千歳空港発着便に影響なし　北海道に津波注意報(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/1035bd38074eeb5d58dbd0bd41af87eb46c91588?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 04:03:01 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-01147567-stv-000-4-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/1035bd38074eeb5d58dbd0bd41af87eb46c91588/comments</comments>
                  <description>
                      交通情報です。
                      
                      ＪＲ北海道によりますと、緊急地震速報の発表で、一部の列車が一時的に運転を停止しましたが、順次再開し、運転を見合わせている区間はないということです。
                      
                      また、札幌市交通局によりますと、
                  </description>
              </item>
              <item>
                  <title>【避難所情報】道内で避難指示　浜大樹・旭地区７８世帯２０９人　北海道太平洋中部などに津波注意報(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/feeedfdf8545ba7c9299e893741ff4e0e8faa32a?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 03:59:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-09163855-stv-000-4-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/feeedfdf8545ba7c9299e893741ff4e0e8faa32a/comments</comments>
                  <description>
                      大樹町は１２月１２日午前１１時５４分に、浜大樹、旭地区７８世帯２０９人に避難指示を出しました。
                      
                      町内には２か所の避難所が開設されています。
                      
                      歴舟コミュニティーセンターと中島コミュニティセンターとい
                  </description>
              </item>
              <item>
                  <title>年に数回レベルの寒さ…留萌はホワイトアウト状態に「参りました」寒さで快速エアポートなど運休発生(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/128d3a3acbcdc6b60a01a14d215393abc862acf2?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 03:42:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-04844899-stv-000-2-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/128d3a3acbcdc6b60a01a14d215393abc862acf2/comments</comments>
                  <description>
                      年に数回レベルの非常に強い寒気が上空に流れ込んでいる影響で、北海道内は厳しい寒さに加えて日本海側を中心に雪や風が強まっています。
                      
                      道北の留萌市では１２月１２日朝、強い風と雪で一時、ホワイトアウト状態
                  </description>
              </item>
              <item>
                  <title>【速報】函館市や厚真町などで震度４　札幌や釧路、帯広などで震度３　震源地は青森県東方沖(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/c795a02f3cea0513af262461a6c8e285f22877a4?source=rss</link>
                  <pubDate>Fri, 12 Dec 2025 02:49:44 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-06592896-stv-000-5-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/c795a02f3cea0513af262461a6c8e285f22877a4/comments</comments>
                  <description>
                      気象庁によると、１２日午前１１時４４分ごろ、地震がありました。
                      
                      震源地は青森県東方沖。震源の深さは２０キロ。地震の規模を示すマグニチュードは６．５と推定。
                  </description>
              </item>
              <item>
                  <title>メガソーラー建設工事問題　道に駆け込み建設中止求める　署名約17万6000筆を提出　北海道(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/64bb2722d5ebc93d6480cf1547f31e2af2fde147?source=rss</link>
                  <pubDate>Thu, 11 Dec 2025 22:16:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-05447854-stv-000-3-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/64bb2722d5ebc93d6480cf1547f31e2af2fde147/comments</comments>
                  <description>
                      釧路湿原でのメガソーラー建設工事を巡り、きのう(2025年12月11日)有志団体が道に規制条例の施行前の駆け込み建設に対する建設中止の署名およそ17万6000筆を提出しました。
                      
                      道に署名を提出したの
                  </description>
              </item>
              <item>
                  <title>右側のプロペラ停止のまま…旅客機が函館空港に緊急着陸　離陸直後にエンジン不具合　けが人なし(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/119a1b3048060bd0b71f57f6aaa2c949e22858c0?source=rss</link>
                  <pubDate>Thu, 11 Dec 2025 21:00:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-01563614-stv-000-1-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/119a1b3048060bd0b71f57f6aaa2c949e22858c0/comments</comments>
                  <description>
                      丘珠空港から秋田空港に向かっていた北海道エアシステムの旅客機の右側のプロペラが停止し、函館空港に緊急着陸しました。
                      
                      函館空港に着陸した１機の旅客機。
                      
                      その機体の右側のプロペラが停止しているのが確認
                  </description>
              </item>
              <item>
                  <title>小学生の娘の肩に“鉛筆”突き刺す…床に引き倒すなど虐待か　傷害の疑いで女（33）逮捕　札幌市(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/5c9fe7efde4208f63d26829aa06e32071596a0f6?source=rss</link>
                  <pubDate>Thu, 11 Dec 2025 20:45:34 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-06721643-stv-000-4-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/5c9fe7efde4208f63d26829aa06e32071596a0f6/comments</comments>
                  <description>
                      2025年12月11日、札幌・白石警察署は傷害の疑いで札幌市白石区に住む無職の女（33）を逮捕しました。
                      
                      女は12月7日午前10時ごろから午前11時ごろまでの間、一緒に住む小学生の娘に暴行を加えてけ
                  </description>
              </item>
              <item>
                  <title>下水道料金約23％値上げへ　クリーニング店でも日々節約　下水道管の更新や収益低下うけ判断　札幌市(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/4c8664d87846fb1a6e6f9e2596eb2a0cb71eaa0c?source=rss</link>
                  <pubDate>Thu, 11 Dec 2025 20:30:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-07291155-stv-000-1-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/4c8664d87846fb1a6e6f9e2596eb2a0cb71eaa0c/comments</comments>
                  <description>
                      札幌市で下水道料金の値上げが決まりました。
                      
                      およそ３０年ぶりの料金引き上げに、家計への影響は避けられそうにありません。
                      
                      札幌市豊平区のクリーニング店です。
                      
                      （浅井クリーニング店　浅井照延さん）「
                  </description>
              </item>
              <item>
                  <title>メガソーラー建設計画浮上　“民有地購入”議会で可決　タンチョウ生息地の保全へ　北海道鶴居村(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/8098274b84f1e78092f7a13c273f2e41e2c3a672?source=rss</link>
                  <pubDate>Thu, 11 Dec 2025 20:11:45 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-02893268-stv-000-1-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/8098274b84f1e78092f7a13c273f2e41e2c3a672/comments</comments>
                  <description>
                      北海道鶴居村では、景観やタンチョウの生息地の保全を目的として、村内の民有地を購入する費用を盛り込んだ一般会計補正予算案が村議会で可決されました。
                      
                      鶴居村議会は１２月１１日朝、村内の土地購入費１５０万
                  </description>
              </item>
              <item>
                  <title>レンタルショップでアダルトDVD盗む 再び来店した男を逮捕 店では複数の盗難被害も 札幌市(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/71aa62fe2f26245e6a3e03f8b0446dbaff5d92c1?source=rss</link>
                  <pubDate>Thu, 11 Dec 2025 19:48:01 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251212-04555625-stv-000-5-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/71aa62fe2f26245e6a3e03f8b0446dbaff5d92c1/comments</comments>
                  <description>
                      札幌・東警察署は2025年12月11日、窃盗の疑いで札幌市東区に住む無職の男（54）を逮捕しました。
                      
                      男は2025年11月25日午前11時すぎ、札幌市東区のレンタルショップでアダルトDVD1枚（商品
                  </description>
              </item>
              <item>
                  <title>一夜で深い雪に覆われた札幌「いっぺんに降りすぎ…」新千歳で52便欠航　あすは“警報級”恐れ(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/1dde093d1de525e95cba5bcab727410dc0212698?source=rss</link>
                  <pubDate>Thu, 11 Dec 2025 12:30:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251211-02747699-stv-000-1-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/1dde093d1de525e95cba5bcab727410dc0212698/comments</comments>
                  <description>
                      視界が真っ白になるほど激しく雪が降りしきる新千歳空港です。
                      
                      飛行機もうっすらとしか確認することができません。
                      
                      新千歳空港では雪の影響で、１２月１１日午後４時半までにあわせて５２便が欠航しています。
                  </description>
              </item>
              <item>
                  <title>物価高対応費など２９億円超　クマ対策で春期管理捕獲の経費支援　LPガス利用者への値引き支援も(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/8977e9ab44301d1cb4b604599792444d1db6d65b?source=rss</link>
                  <pubDate>Thu, 11 Dec 2025 12:00:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251211-01422818-stv-000-1-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/8977e9ab44301d1cb4b604599792444d1db6d65b/comments</comments>
                  <description>
                      道は１２月１２日の道議会に、２９億２０００万円余りの一般会計補正予算案を追加提案すると発表しました。
                      
                      国の経済対策を踏まえて物価高対応費用が盛りこまれています。
                      
                      （鈴木知事）「寒さの厳しい本道の冬
                  </description>
              </item>
              <item>
                  <title>破格！ガソリン140円台も　補助金25円に増額「地震あったので満タンに…」災害の備えにも(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/dde0617b988ec28bc09c1eda54bfacbd3f535f19?source=rss</link>
                  <pubDate>Thu, 11 Dec 2025 11:00:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251211-03925455-stv-000-1-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/dde0617b988ec28bc09c1eda54bfacbd3f535f19/comments</comments>
                  <description>
                      ガソリンの補助金が１２月１１日からおよそ２５円に増額されました。
                      
                      これによりガソリン価格は、暫定税率が廃止された場合と同じ程度の金額になります。
                      
                      札幌市内では喜びの声が聞かれました。
                      
                      （吉岡記者
                  </description>
              </item>
              <item>
                  <title>“ニセ警官詐欺”に注意　60代男性1億4500万円だまし取られる　口座開設促す手口　北海道(STVニュース北海道)</title>
                  <link>https://news.yahoo.co.jp/articles/268d1af4e3e51cdc4e303f487b38fb64464b0f7d?source=rss</link>
                  <pubDate>Thu, 11 Dec 2025 10:59:00 GMT</pubDate>
                  <image>https://newsatcl-pctr.c.yimg.jp/t/amd-img/20251211-02489718-stv-000-4-thumb.jpg?pri=l&amp;w=450&amp;h=253&amp;exp=10800</image>
                  <comments>https://news.yahoo.co.jp/articles/268d1af4e3e51cdc4e303f487b38fb64464b0f7d/comments</comments>
                  <description>
                      北海道・厚別警察署は2025年12月11日、札幌市厚別区に住む60代の男性が約1億4500万円をだまし取られる特殊詐欺事件が発生したと発表しました。
                      
                      2025年5月28日ごろ、札幌市厚別区に住む60
                  </description>
              </item>
          </channel>
      </rss>`;
    return HttpResponse.text(rssResponse);
  }),

  // OpenWeatherMapの天気APIのモック
  http.get('https://api.openweathermap.org/data/3.0/onecall', () => {
    return HttpResponse.json({
      lat: 42.9238,
      lon: 143.1966,
      timezone: 'Asia/Tokyo',
      timezone_offset: 32400,
      current: {
        dt: 1765665966,
        sunrise: 1765662624,
        sunset: 1765695192,
        temp: -10.3,
        feels_like: -10.3,
        pressure: 1021,
        humidity: 87,
        dew_point: -11.86,
        uvi: 0.19,
        clouds: 100,
        visibility: 10000,
        wind_speed: 0.93,
        wind_deg: 339,
        wind_gust: 0.96,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: '厚い雲',
            icon: '04d',
          },
        ],
      },
      minutely: [
        {
          dt: 1765666020,
          precipitation: 0,
        },
        {
          dt: 1765666080,
          precipitation: 0,
        },
        {
          dt: 1765666140,
          precipitation: 0,
        },
        {
          dt: 1765666200,
          precipitation: 0,
        },
        {
          dt: 1765666260,
          precipitation: 0,
        },
        {
          dt: 1765666320,
          precipitation: 0,
        },
        {
          dt: 1765666380,
          precipitation: 0,
        },
        {
          dt: 1765666440,
          precipitation: 0,
        },
        {
          dt: 1765666500,
          precipitation: 0,
        },
        {
          dt: 1765666560,
          precipitation: 0,
        },
        {
          dt: 1765666620,
          precipitation: 0,
        },
        {
          dt: 1765666680,
          precipitation: 0,
        },
        {
          dt: 1765666740,
          precipitation: 0,
        },
        {
          dt: 1765666800,
          precipitation: 0,
        },
        {
          dt: 1765666860,
          precipitation: 0,
        },
        {
          dt: 1765666920,
          precipitation: 0,
        },
        {
          dt: 1765666980,
          precipitation: 0,
        },
        {
          dt: 1765667040,
          precipitation: 0,
        },
        {
          dt: 1765667100,
          precipitation: 0,
        },
        {
          dt: 1765667160,
          precipitation: 0,
        },
        {
          dt: 1765667220,
          precipitation: 0,
        },
        {
          dt: 1765667280,
          precipitation: 0,
        },
        {
          dt: 1765667340,
          precipitation: 0,
        },
        {
          dt: 1765667400,
          precipitation: 0,
        },
        {
          dt: 1765667460,
          precipitation: 0,
        },
        {
          dt: 1765667520,
          precipitation: 0,
        },
        {
          dt: 1765667580,
          precipitation: 0,
        },
        {
          dt: 1765667640,
          precipitation: 0,
        },
        {
          dt: 1765667700,
          precipitation: 0,
        },
        {
          dt: 1765667760,
          precipitation: 0,
        },
        {
          dt: 1765667820,
          precipitation: 0,
        },
        {
          dt: 1765667880,
          precipitation: 0,
        },
        {
          dt: 1765667940,
          precipitation: 0,
        },
        {
          dt: 1765668000,
          precipitation: 0,
        },
        {
          dt: 1765668060,
          precipitation: 0,
        },
        {
          dt: 1765668120,
          precipitation: 0,
        },
        {
          dt: 1765668180,
          precipitation: 0,
        },
        {
          dt: 1765668240,
          precipitation: 0,
        },
        {
          dt: 1765668300,
          precipitation: 0,
        },
        {
          dt: 1765668360,
          precipitation: 0,
        },
        {
          dt: 1765668420,
          precipitation: 0,
        },
        {
          dt: 1765668480,
          precipitation: 0,
        },
        {
          dt: 1765668540,
          precipitation: 0,
        },
        {
          dt: 1765668600,
          precipitation: 0,
        },
        {
          dt: 1765668660,
          precipitation: 0,
        },
        {
          dt: 1765668720,
          precipitation: 0,
        },
        {
          dt: 1765668780,
          precipitation: 0,
        },
        {
          dt: 1765668840,
          precipitation: 0,
        },
        {
          dt: 1765668900,
          precipitation: 0,
        },
        {
          dt: 1765668960,
          precipitation: 0,
        },
        {
          dt: 1765669020,
          precipitation: 0,
        },
        {
          dt: 1765669080,
          precipitation: 0,
        },
        {
          dt: 1765669140,
          precipitation: 0,
        },
        {
          dt: 1765669200,
          precipitation: 0,
        },
        {
          dt: 1765669260,
          precipitation: 0,
        },
        {
          dt: 1765669320,
          precipitation: 0,
        },
        {
          dt: 1765669380,
          precipitation: 0,
        },
        {
          dt: 1765669440,
          precipitation: 0,
        },
        {
          dt: 1765669500,
          precipitation: 0,
        },
        {
          dt: 1765669560,
          precipitation: 0,
        },
      ],
      hourly: [
        {
          dt: 1765663200,
          temp: -9.71,
          feels_like: -9.71,
          pressure: 1021,
          humidity: 88,
          dew_point: -11.14,
          uvi: 0,
          clouds: 100,
          visibility: 10000,
          wind_speed: 1.27,
          wind_deg: 344,
          wind_gust: 1.47,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: '厚い雲',
              icon: '04d',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765666800,
          temp: -10.3,
          feels_like: -10.3,
          pressure: 1021,
          humidity: 87,
          dew_point: -11.86,
          uvi: 0.19,
          clouds: 100,
          visibility: 10000,
          wind_speed: 0.93,
          wind_deg: 339,
          wind_gust: 0.96,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: '厚い雲',
              icon: '04d',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765670400,
          temp: -9.24,
          feels_like: -9.24,
          pressure: 1021,
          humidity: 85,
          dew_point: -11.07,
          uvi: 0.46,
          clouds: 100,
          visibility: 10000,
          wind_speed: 1.02,
          wind_deg: 347,
          wind_gust: 1.06,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: '厚い雲',
              icon: '04d',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765674000,
          temp: -7.86,
          feels_like: -7.86,
          pressure: 1021,
          humidity: 83,
          dew_point: -9.98,
          uvi: 0.63,
          clouds: 100,
          visibility: 10000,
          wind_speed: 0.82,
          wind_deg: 332,
          wind_gust: 0.93,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: '厚い雲',
              icon: '04d',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765677600,
          temp: -6.36,
          feels_like: -9.38,
          pressure: 1019,
          humidity: 82,
          dew_point: -8.64,
          uvi: 0.81,
          clouds: 100,
          visibility: 10000,
          wind_speed: 1.7,
          wind_deg: 345,
          wind_gust: 2.05,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: '厚い雲',
              icon: '04d',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765681200,
          temp: -5.14,
          feels_like: -8.07,
          pressure: 1018,
          humidity: 93,
          dew_point: -5.99,
          uvi: 0.74,
          clouds: 100,
          visibility: 851,
          wind_speed: 1.76,
          wind_deg: 328,
          wind_gust: 2.41,
          weather: [
            {
              id: 601,
              main: 'Snow',
              description: '雪',
              icon: '13d',
            },
          ],
          pop: 0.98,
          snow: {
            '1h': 0.58,
          },
        },
        {
          dt: 1765684800,
          temp: -3.4,
          feels_like: -6.47,
          pressure: 1015,
          humidity: 96,
          dew_point: -4.22,
          uvi: 0.46,
          clouds: 100,
          visibility: 172,
          wind_speed: 2.04,
          wind_deg: 346,
          wind_gust: 3.74,
          weather: [
            {
              id: 601,
              main: 'Snow',
              description: '雪',
              icon: '13d',
            },
          ],
          pop: 1,
          snow: {
            '1h': 1.08,
          },
        },
        {
          dt: 1765688400,
          temp: -3.01,
          feels_like: -6.77,
          pressure: 1014,
          humidity: 97,
          dew_point: -3.68,
          uvi: 0.25,
          clouds: 100,
          visibility: 138,
          wind_speed: 2.66,
          wind_deg: 329,
          wind_gust: 4.57,
          weather: [
            {
              id: 601,
              main: 'Snow',
              description: '雪',
              icon: '13d',
            },
          ],
          pop: 1,
          snow: {
            '1h': 1.04,
          },
        },
        {
          dt: 1765692000,
          temp: -2.77,
          feels_like: -6.44,
          pressure: 1013,
          humidity: 97,
          dew_point: -3.39,
          uvi: 0.09,
          clouds: 100,
          visibility: 108,
          wind_speed: 2.62,
          wind_deg: 338,
          wind_gust: 5.68,
          weather: [
            {
              id: 601,
              main: 'Snow',
              description: '雪',
              icon: '13d',
            },
          ],
          pop: 1,
          snow: {
            '1h': 2.13,
          },
        },
        {
          dt: 1765695600,
          temp: -2.38,
          feels_like: -6.11,
          pressure: 1011,
          humidity: 97,
          dew_point: -2.98,
          uvi: 0,
          clouds: 100,
          visibility: 104,
          wind_speed: 2.75,
          wind_deg: 355,
          wind_gust: 6.5,
          weather: [
            {
              id: 601,
              main: 'Snow',
              description: '雪',
              icon: '13n',
            },
          ],
          pop: 1,
          snow: {
            '1h': 2.57,
          },
        },
        {
          dt: 1765699200,
          temp: -1.38,
          feels_like: -6.46,
          pressure: 1009,
          humidity: 97,
          dew_point: -1.97,
          uvi: 0,
          clouds: 100,
          visibility: 273,
          wind_speed: 4.71,
          wind_deg: 26,
          wind_gust: 11.78,
          weather: [
            {
              id: 601,
              main: 'Snow',
              description: '雪',
              icon: '13n',
            },
          ],
          pop: 1,
          snow: {
            '1h': 2.33,
          },
        },
        {
          dt: 1765702800,
          temp: -0.12,
          feels_like: -6.27,
          pressure: 1006,
          humidity: 97,
          dew_point: -0.67,
          uvi: 0,
          clouds: 100,
          visibility: 158,
          wind_speed: 7.47,
          wind_deg: 43,
          wind_gust: 15.13,
          weather: [
            {
              id: 601,
              main: 'Snow',
              description: '雪',
              icon: '13n',
            },
          ],
          pop: 1,
          snow: {
            '1h': 1.56,
          },
        },
        {
          dt: 1765706400,
          temp: 0.01,
          feels_like: -6.3,
          pressure: 1003,
          humidity: 98,
          dew_point: -0.33,
          uvi: 0,
          clouds: 100,
          visibility: 61,
          wind_speed: 7.96,
          wind_deg: 48,
          wind_gust: 16.19,
          weather: [
            {
              id: 601,
              main: 'Snow',
              description: '雪',
              icon: '13n',
            },
          ],
          pop: 1,
          snow: {
            '1h': 2.83,
          },
        },
        {
          dt: 1765710000,
          temp: 0.1,
          feels_like: -6.1,
          pressure: 1001,
          humidity: 99,
          dew_point: -0.25,
          uvi: 0,
          clouds: 100,
          visibility: 49,
          wind_speed: 7.76,
          wind_deg: 51,
          wind_gust: 16.55,
          weather: [
            {
              id: 601,
              main: 'Snow',
              description: '雪',
              icon: '13n',
            },
          ],
          pop: 1,
          snow: {
            '1h': 3.57,
          },
        },
        {
          dt: 1765713600,
          temp: 0.14,
          feels_like: -6.16,
          pressure: 999,
          humidity: 98,
          dew_point: -0.22,
          uvi: 0,
          clouds: 100,
          visibility: 20,
          wind_speed: 8.05,
          wind_deg: 45,
          wind_gust: 16.66,
          weather: [
            {
              id: 601,
              main: 'Snow',
              description: '雪',
              icon: '13n',
            },
          ],
          pop: 1,
          snow: {
            '1h': 3.92,
          },
        },
        {
          dt: 1765717200,
          temp: 0.46,
          feels_like: -5.42,
          pressure: 996,
          humidity: 99,
          dew_point: 0.16,
          uvi: 0,
          clouds: 100,
          wind_speed: 7.24,
          wind_deg: 36,
          wind_gust: 15.53,
          weather: [
            {
              id: 602,
              main: 'Snow',
              description: '大雪',
              icon: '13n',
            },
          ],
          pop: 1,
          snow: {
            '1h': 5.1,
          },
        },
        {
          dt: 1765720800,
          temp: 0.55,
          feels_like: -5.05,
          pressure: 993,
          humidity: 98,
          dew_point: 0.09,
          uvi: 0,
          clouds: 100,
          visibility: 153,
          wind_speed: 6.63,
          wind_deg: 24,
          wind_gust: 15,
          weather: [
            {
              id: 602,
              main: 'Snow',
              description: '大雪',
              icon: '13n',
            },
          ],
          pop: 1,
          snow: {
            '1h': 5.62,
          },
        },
        {
          dt: 1765724400,
          temp: 0.32,
          feels_like: -5.82,
          pressure: 992,
          humidity: 95,
          dew_point: -0.59,
          uvi: 0,
          clouds: 100,
          visibility: 382,
          wind_speed: 7.77,
          wind_deg: 18,
          wind_gust: 14.97,
          weather: [
            {
              id: 602,
              main: 'Snow',
              description: '大雪',
              icon: '13n',
            },
          ],
          pop: 1,
          snow: {
            '1h': 5.41,
          },
        },
        {
          dt: 1765728000,
          temp: 0.78,
          feels_like: -6.18,
          pressure: 989,
          humidity: 89,
          dew_point: -1,
          uvi: 0,
          clouds: 100,
          visibility: 2281,
          wind_speed: 10.6,
          wind_deg: 4,
          wind_gust: 19.18,
          weather: [
            {
              id: 601,
              main: 'Snow',
              description: '雪',
              icon: '13n',
            },
          ],
          pop: 1,
          snow: {
            '1h': 3.29,
          },
        },
        {
          dt: 1765731600,
          temp: 1.47,
          feels_like: -4.72,
          pressure: 987,
          humidity: 86,
          dew_point: -0.74,
          uvi: 0,
          clouds: 100,
          visibility: 4581,
          wind_speed: 8.87,
          wind_deg: 324,
          wind_gust: 18.09,
          weather: [
            {
              id: 601,
              main: 'Snow',
              description: '雪',
              icon: '13n',
            },
          ],
          pop: 1,
          snow: {
            '1h': 1.4,
          },
        },
        {
          dt: 1765735200,
          temp: 1.16,
          feels_like: -5.02,
          pressure: 986,
          humidity: 86,
          dew_point: -1.07,
          uvi: 0,
          clouds: 100,
          visibility: 5779,
          wind_speed: 8.57,
          wind_deg: 313,
          wind_gust: 16.06,
          weather: [
            {
              id: 601,
              main: 'Snow',
              description: '雪',
              icon: '13n',
            },
          ],
          pop: 1,
          snow: {
            '1h': 1.12,
          },
        },
        {
          dt: 1765738800,
          temp: 1.68,
          feels_like: -4.27,
          pressure: 986,
          humidity: 80,
          dew_point: -1.48,
          uvi: 0,
          clouds: 100,
          visibility: 10000,
          wind_speed: 8.37,
          wind_deg: 320,
          wind_gust: 17.62,
          weather: [
            {
              id: 601,
              main: 'Snow',
              description: '雪',
              icon: '13n',
            },
          ],
          pop: 1,
          snow: {
            '1h': 0.89,
          },
        },
        {
          dt: 1765742400,
          temp: 1.75,
          feels_like: -4.06,
          pressure: 986,
          humidity: 76,
          dew_point: -2.14,
          uvi: 0,
          clouds: 100,
          visibility: 10000,
          wind_speed: 8.02,
          wind_deg: 291,
          wind_gust: 13.97,
          weather: [
            {
              id: 600,
              main: 'Snow',
              description: '小雪',
              icon: '13n',
            },
          ],
          pop: 1,
          snow: {
            '1h': 0.24,
          },
        },
        {
          dt: 1765746000,
          temp: 2.02,
          feels_like: -4.13,
          pressure: 987,
          humidity: 73,
          dew_point: -2.34,
          uvi: 0,
          clouds: 100,
          visibility: 10000,
          wind_speed: 9.28,
          wind_deg: 295,
          wind_gust: 14.18,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: '厚い雲',
              icon: '04n',
            },
          ],
          pop: 0.76,
        },
        {
          dt: 1765749600,
          temp: 1.93,
          feels_like: -4.93,
          pressure: 988,
          humidity: 69,
          dew_point: -3.26,
          uvi: 0,
          clouds: 100,
          visibility: 10000,
          wind_speed: 11.59,
          wind_deg: 298,
          wind_gust: 17.31,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: '厚い雲',
              icon: '04d',
            },
          ],
          pop: 0.9,
        },
        {
          dt: 1765753200,
          temp: 2.03,
          feels_like: -4.97,
          pressure: 991,
          humidity: 69,
          dew_point: -3.11,
          uvi: 0.19,
          clouds: 100,
          visibility: 10000,
          wind_speed: 12.49,
          wind_deg: 295,
          wind_gust: 17.16,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: '厚い雲',
              icon: '04d',
            },
          ],
          pop: 0.83,
        },
        {
          dt: 1765756800,
          temp: 1.86,
          feels_like: -5.14,
          pressure: 992,
          humidity: 71,
          dew_point: -2.95,
          uvi: 0.56,
          clouds: 100,
          visibility: 10000,
          wind_speed: 12.36,
          wind_deg: 294,
          wind_gust: 16.81,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: '厚い雲',
              icon: '04d',
            },
          ],
          pop: 0.79,
        },
        {
          dt: 1765760400,
          temp: 2.11,
          feels_like: -4.89,
          pressure: 994,
          humidity: 71,
          dew_point: -2.77,
          uvi: 0.94,
          clouds: 100,
          visibility: 10000,
          wind_speed: 12.98,
          wind_deg: 295,
          wind_gust: 17.72,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: '厚い雲',
              icon: '04d',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765764000,
          temp: 2.04,
          feels_like: -4.96,
          pressure: 994,
          humidity: 72,
          dew_point: -2.59,
          uvi: 1.08,
          clouds: 99,
          visibility: 10000,
          wind_speed: 13.97,
          wind_deg: 297,
          wind_gust: 19.76,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: '厚い雲',
              icon: '04d',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765767600,
          temp: 2.05,
          feels_like: -4.95,
          pressure: 996,
          humidity: 73,
          dew_point: -2.44,
          uvi: 1.08,
          clouds: 99,
          visibility: 10000,
          wind_speed: 13.4,
          wind_deg: 297,
          wind_gust: 19.61,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: '厚い雲',
              icon: '04d',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765771200,
          temp: 2.13,
          feels_like: -4.87,
          pressure: 997,
          humidity: 72,
          dew_point: -2.49,
          uvi: 0.83,
          clouds: 99,
          visibility: 10000,
          wind_speed: 12.86,
          wind_deg: 299,
          wind_gust: 19.55,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: '厚い雲',
              icon: '04d',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765774800,
          temp: 2.14,
          feels_like: -4.85,
          pressure: 999,
          humidity: 68,
          dew_point: -3.36,
          uvi: 0.47,
          clouds: 99,
          visibility: 10000,
          wind_speed: 12.38,
          wind_deg: 300,
          wind_gust: 20.76,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: '厚い雲',
              icon: '04d',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765778400,
          temp: 1.83,
          feels_like: -4.77,
          pressure: 1001,
          humidity: 69,
          dew_point: -3.28,
          uvi: 0.18,
          clouds: 100,
          visibility: 10000,
          wind_speed: 10.54,
          wind_deg: 307,
          wind_gust: 18.2,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: '厚い雲',
              icon: '04d',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765782000,
          temp: 1.53,
          feels_like: -4.79,
          pressure: 1003,
          humidity: 74,
          dew_point: -2.68,
          uvi: 0,
          clouds: 100,
          visibility: 10000,
          wind_speed: 9.32,
          wind_deg: 301,
          wind_gust: 17.33,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: '厚い雲',
              icon: '04n',
            },
          ],
          pop: 0.04,
        },
        {
          dt: 1765785600,
          temp: 0.8,
          feels_like: -6.2,
          pressure: 1004,
          humidity: 72,
          dew_point: -3.86,
          uvi: 0,
          clouds: 80,
          visibility: 10000,
          wind_speed: 11.14,
          wind_deg: 302,
          wind_gust: 18.73,
          weather: [
            {
              id: 803,
              main: 'Clouds',
              description: '曇りがち',
              icon: '04n',
            },
          ],
          pop: 0.02,
        },
        {
          dt: 1765789200,
          temp: -0.05,
          feels_like: -7.05,
          pressure: 1006,
          humidity: 72,
          dew_point: -4.66,
          uvi: 0,
          clouds: 55,
          visibility: 10000,
          wind_speed: 11.5,
          wind_deg: 302,
          wind_gust: 18.93,
          weather: [
            {
              id: 803,
              main: 'Clouds',
              description: '曇りがち',
              icon: '04n',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765792800,
          temp: -0.86,
          feels_like: -7.86,
          pressure: 1007,
          humidity: 70,
          dew_point: -5.74,
          uvi: 0,
          clouds: 42,
          visibility: 10000,
          wind_speed: 10.29,
          wind_deg: 297,
          wind_gust: 17.33,
          weather: [
            {
              id: 802,
              main: 'Clouds',
              description: '雲',
              icon: '03n',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765796400,
          temp: -1.83,
          feels_like: -8.83,
          pressure: 1008,
          humidity: 69,
          dew_point: -6.88,
          uvi: 0,
          clouds: 33,
          visibility: 10000,
          wind_speed: 9.99,
          wind_deg: 286,
          wind_gust: 16.98,
          weather: [
            {
              id: 802,
              main: 'Clouds',
              description: '雲',
              icon: '03n',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765800000,
          temp: -2.71,
          feels_like: -9.71,
          pressure: 1009,
          humidity: 68,
          dew_point: -8.03,
          uvi: 0,
          clouds: 28,
          visibility: 10000,
          wind_speed: 10.55,
          wind_deg: 282,
          wind_gust: 17.27,
          weather: [
            {
              id: 802,
              main: 'Clouds',
              description: '雲',
              icon: '03n',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765803600,
          temp: -3.26,
          feels_like: -10.26,
          pressure: 1009,
          humidity: 66,
          dew_point: -8.95,
          uvi: 0,
          clouds: 1,
          visibility: 10000,
          wind_speed: 10,
          wind_deg: 288,
          wind_gust: 17.35,
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: '晴天',
              icon: '01n',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765807200,
          temp: -4.03,
          feels_like: -11.03,
          pressure: 1010,
          humidity: 71,
          dew_point: -8.75,
          uvi: 0,
          clouds: 0,
          visibility: 10000,
          wind_speed: 7.98,
          wind_deg: 293,
          wind_gust: 14.62,
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: '晴天',
              icon: '01n',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765810800,
          temp: -4.74,
          feels_like: -11.52,
          pressure: 1010,
          humidity: 76,
          dew_point: -8.76,
          uvi: 0,
          clouds: 0,
          visibility: 10000,
          wind_speed: 6.1,
          wind_deg: 282,
          wind_gust: 11.27,
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: '晴天',
              icon: '01n',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765814400,
          temp: -5.19,
          feels_like: -11.54,
          pressure: 1010,
          humidity: 78,
          dew_point: -8.78,
          uvi: 0,
          clouds: 1,
          visibility: 10000,
          wind_speed: 5.2,
          wind_deg: 270,
          wind_gust: 9.32,
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: '晴天',
              icon: '01n',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765818000,
          temp: -5.72,
          feels_like: -11.91,
          pressure: 1010,
          humidity: 81,
          dew_point: -8.88,
          uvi: 0,
          clouds: 2,
          visibility: 10000,
          wind_speed: 4.77,
          wind_deg: 272,
          wind_gust: 8.46,
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: '晴天',
              icon: '01n',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765821600,
          temp: -5.29,
          feels_like: -11.07,
          pressure: 1011,
          humidity: 80,
          dew_point: -8.64,
          uvi: 0,
          clouds: 6,
          visibility: 10000,
          wind_speed: 4.36,
          wind_deg: 270,
          wind_gust: 8.49,
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: '晴天',
              icon: '01n',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765825200,
          temp: -5.3,
          feels_like: -11.14,
          pressure: 1011,
          humidity: 80,
          dew_point: -8.57,
          uvi: 0,
          clouds: 34,
          visibility: 10000,
          wind_speed: 4.44,
          wind_deg: 260,
          wind_gust: 8.24,
          weather: [
            {
              id: 802,
              main: 'Clouds',
              description: '雲',
              icon: '03n',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765828800,
          temp: -4.92,
          feels_like: -10.99,
          pressure: 1011,
          humidity: 78,
          dew_point: -8.59,
          uvi: 0,
          clouds: 44,
          visibility: 10000,
          wind_speed: 4.88,
          wind_deg: 256,
          wind_gust: 9.47,
          weather: [
            {
              id: 802,
              main: 'Clouds',
              description: '雲',
              icon: '03n',
            },
          ],
          pop: 0,
        },
        {
          dt: 1765832400,
          temp: -4.28,
          feels_like: -10.62,
          pressure: 1011,
          humidity: 75,
          dew_point: -8.36,
          uvi: 0,
          clouds: 46,
          visibility: 10000,
          wind_speed: 5.55,
          wind_deg: 259,
          wind_gust: 10.41,
          weather: [
            {
              id: 802,
              main: 'Clouds',
              description: '雲',
              icon: '03n',
            },
          ],
          pop: 0,
        },
      ],
      daily: [
        {
          dt: 1765677600,
          sunrise: 1765662624,
          sunset: 1765695192,
          moonrise: 1765641900,
          moonset: 1765682340,
          moon_phase: 0.82,
          summary:
            'The day will start with partly cloudy through the late morning hours, transitioning to snow',
          temp: {
            day: -6.36,
            min: -10.3,
            max: 0.55,
            night: 0.55,
            eve: -1.38,
            morn: -8.42,
          },
          feels_like: {
            day: -9.38,
            night: -5.05,
            eve: -6.46,
            morn: -8.42,
          },
          pressure: 1019,
          humidity: 82,
          dew_point: -8.64,
          wind_speed: 8.05,
          wind_deg: 45,
          wind_gust: 16.66,
          weather: [
            {
              id: 602,
              main: 'Snow',
              description: '大雪',
              icon: '13d',
            },
          ],
          clouds: 100,
          pop: 1,
          snow: 32.33,
          uvi: 0.81,
        },
        {
          dt: 1765764000,
          sunrise: 1765749068,
          sunset: 1765781604,
          moonrise: 1765732080,
          moonset: 1765769940,
          moon_phase: 0.85,
          summary: 'Expect a day of partly cloudy with snow',
          temp: {
            day: 2.04,
            min: -4.03,
            max: 2.14,
            night: -4.03,
            eve: 0.8,
            morn: 1.75,
          },
          feels_like: {
            day: -4.96,
            night: -11.03,
            eve: -6.2,
            morn: -4.06,
          },
          pressure: 994,
          humidity: 72,
          dew_point: -2.59,
          wind_speed: 13.97,
          wind_deg: 297,
          wind_gust: 20.76,
          weather: [
            {
              id: 602,
              main: 'Snow',
              description: '大雪',
              icon: '13d',
            },
          ],
          clouds: 99,
          pop: 1,
          snow: 12.35,
          uvi: 1.08,
        },
        {
          dt: 1765850400,
          sunrise: 1765835510,
          sunset: 1765868018,
          moonrise: 1765822320,
          moonset: 1765857720,
          moon_phase: 0.88,
          summary: 'Expect a day of partly cloudy with clear spells',
          temp: {
            day: -0.49,
            min: -10.76,
            max: -0.31,
            night: -10.76,
            eve: -6.69,
            morn: -4.92,
          },
          feels_like: {
            day: -6.31,
            night: -17.76,
            eve: -13.69,
            morn: -10.99,
          },
          pressure: 1009,
          humidity: 68,
          dew_point: -5.81,
          wind_speed: 7.46,
          wind_deg: 301,
          wind_gust: 12.59,
          weather: [
            {
              id: 801,
              main: 'Clouds',
              description: '薄い雲',
              icon: '02d',
            },
          ],
          clouds: 12,
          pop: 0,
          uvi: 1.45,
        },
        {
          dt: 1765936800,
          sunrise: 1765921951,
          sunset: 1765954434,
          moonrise: 1765912560,
          moonset: 1765945740,
          moon_phase: 0.91,
          summary: 'There will be clear sky today',
          temp: {
            day: -4.63,
            min: -15.41,
            max: -4.63,
            night: -15.41,
            eve: -13.7,
            morn: -12.22,
          },
          feels_like: {
            day: -4.63,
            night: -15.41,
            eve: -17.56,
            morn: -19.22,
          },
          pressure: 1014,
          humidity: 65,
          dew_point: -10.38,
          wind_speed: 5.62,
          wind_deg: 265,
          wind_gust: 9.3,
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: '晴天',
              icon: '01d',
            },
          ],
          clouds: 0,
          pop: 0,
          uvi: 1.51,
        },
        {
          dt: 1766023200,
          sunrise: 1766008389,
          sunset: 1766040853,
          moonrise: 1766002800,
          moonset: 1766034120,
          moon_phase: 0.94,
          summary: 'You can expect clear sky in the morning, with partly cloudy in the afternoon',
          temp: {
            day: -2.88,
            min: -16.64,
            max: -2.88,
            night: -13.08,
            eve: -11.54,
            morn: -11.7,
          },
          feels_like: {
            day: -6.45,
            night: -16.6,
            eve: -15.68,
            morn: -18.03,
          },
          pressure: 1023,
          humidity: 71,
          dew_point: -7.66,
          wind_speed: 3.6,
          wind_deg: 270,
          wind_gust: 8.24,
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: '晴天',
              icon: '01d',
            },
          ],
          clouds: 0,
          pop: 0,
          uvi: 1.37,
        },
        {
          dt: 1766109600,
          sunrise: 1766094825,
          sunset: 1766127274,
          moonrise: 1766092920,
          moonset: 1766123040,
          moon_phase: 0.97,
          summary:
            'The day will start with clear sky through the late morning hours, transitioning to partly cloudy',
          temp: {
            day: -2.43,
            min: -14.92,
            max: -0.68,
            night: -0.68,
            eve: -3.2,
            morn: -14.92,
          },
          feels_like: {
            day: -2.43,
            night: -0.68,
            eve: -3.2,
            morn: -14.92,
          },
          pressure: 1026,
          humidity: 84,
          dew_point: -5,
          wind_speed: 0.9,
          wind_deg: 273,
          wind_gust: 1.77,
          weather: [
            {
              id: 802,
              main: 'Clouds',
              description: '雲',
              icon: '03d',
            },
          ],
          clouds: 35,
          pop: 0.04,
          uvi: 2,
        },
        {
          dt: 1766196000,
          sunrise: 1766181259,
          sunset: 1766213697,
          moonrise: 1766182680,
          moonset: 1766212440,
          moon_phase: 0,
          summary: 'There will be partly cloudy today',
          temp: {
            day: 1.66,
            min: -3.17,
            max: 1.66,
            night: 0.88,
            eve: 0.98,
            morn: -0.41,
          },
          feels_like: {
            day: 1.66,
            night: 0.88,
            eve: 0.98,
            morn: -0.41,
          },
          pressure: 1020,
          humidity: 100,
          dew_point: 1.46,
          wind_speed: 1.29,
          wind_deg: 71,
          wind_gust: 0.67,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: '厚い雲',
              icon: '04d',
            },
          ],
          clouds: 90,
          pop: 0,
          uvi: 2,
        },
        {
          dt: 1766282400,
          sunrise: 1766267691,
          sunset: 1766300123,
          moonrise: 1766272020,
          moonset: 1766302380,
          moon_phase: 0.03,
          summary:
            'The day will start with partly cloudy through the late morning hours, transitioning to clearing',
          temp: {
            day: -1.48,
            min: -9.6,
            max: 1.27,
            night: -9.6,
            eve: -6.24,
            morn: -0.64,
          },
          feels_like: {
            day: -8.29,
            night: -9.6,
            eve: -12.01,
            morn: -7.01,
          },
          pressure: 1028,
          humidity: 70,
          dew_point: -6.33,
          wind_speed: 8.1,
          wind_deg: 310,
          wind_gust: 14.05,
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: '晴天',
              icon: '01d',
            },
          ],
          clouds: 0,
          pop: 0,
          uvi: 2,
        },
      ],
      alerts: [
        {
          sender_name: 'JMA',
          event: '大雪注意報',
          start: 1765681201,
          end: 1765702800,
          description: '降雪による交通障害\n１２時間最大降雪量５０センチ',
          tags: ['Snow/Ice'],
        },
        {
          sender_name: 'JMA',
          event: '大雪注意報',
          start: 1765702801,
          end: 1765735200,
          description: '降雪による交通障害\n１２時間最大降雪量５０センチ',
          tags: ['Snow/Ice'],
        },
        {
          sender_name: 'JMA',
          event: '大雪注意報',
          start: 1765735201,
          end: 1765756800,
          description: '降雪による交通障害\n１２時間最大降雪量５０センチ',
          tags: ['Snow/Ice'],
        },
        {
          sender_name: 'JMA',
          event: '風雪注意報',
          start: 1765681201,
          end: 1765756800,
          description: '',
          tags: ['Wind', 'Snow/Ice'],
        },
        {
          sender_name: 'JMA',
          event: '着雪注意報',
          start: 1765681201,
          end: 1765756800,
          description: '',
          tags: ['Snow/Ice'],
        },
        {
          sender_name: 'JMA',
          event: 'なだれ注意報',
          start: 1765638001,
          end: 1765810800,
          description: '',
          tags: ['Avalanches'],
        },

        {
          sender_name: 'JMA',
          event: '大雪特別警報',
          start: 1765681201,
          end: 1765702800,
          description: '降雪による交通障害\n１２時間最大降雪量５０センチ',
          tags: ['Snow/Ice'],
        },
        {
          sender_name: 'JMA',
          event: '風雪特別警報',
          start: 1765681201,
          end: 1765756800,
          description: '',
          tags: ['Wind', 'Snow/Ice'],
        },
        {
          sender_name: 'JMA',
          event: '着雪特別警報',
          start: 1765681201,
          end: 1765756800,
          description: '',
          tags: ['Snow/Ice'],
        },
        {
          sender_name: 'JMA',
          event: '暴風雪特別警報',
          start: 1765638001,
          end: 1765810800,
          description: '',
          tags: ['Avalanches'],
        },

        {
          sender_name: 'JMA',
          event: '大雪警報',
          start: 1765681201,
          end: 1765702800,
          description: '降雪による交通障害\n１２時間最大降雪量５０センチ',
          tags: ['Snow/Ice'],
        },
        {
          sender_name: 'JMA',
          event: '風雪警報',
          start: 1765681201,
          end: 1765756800,
          description: '',
          tags: ['Wind', 'Snow/Ice'],
        },
        {
          sender_name: 'JMA',
          event: '着雪警報',
          start: 1765681201,
          end: 1765756800,
          description: '',
          tags: ['Snow/Ice'],
        },
        {
          sender_name: 'JMA',
          event: 'なだれ警報',
          start: 1765638001,
          end: 1765810800,
          description: '',
          tags: ['Avalanches'],
        },
      ],
    });
  }),
];
