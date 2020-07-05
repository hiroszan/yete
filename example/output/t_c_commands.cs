using System;
using System.ComponentModel;
using Newtonsoft.Json;

using number = System.Double;
using boolean = System.Boolean;

[Description("현재 유저가 진입한 건물의 NPC가 지정된 대사를 말한다.")]
public class t_c_DlgChSpeak : IScriptbleCommand
{
    [JsonProperty(Order = 1)]
    [Description("지정된 대사")]
    public string dlg;

    [JsonProperty(Order = 2)]
    [Description("대사창 위치")]
    public number pos;

    [JsonProperty(Order = 3)]
    [Description("텍스트 캐릭터가 찍히는 속도 간격. 낮을수록 빠름. (default 0.1초)")]
    public number animInterval;

    [JsonProperty(Order = 4)]
    [Description("true 일 경우 이름을 ??? 으로 출력")]
    public boolean bHideName;

    [JsonProperty(Order = 5)]
    [Description("스파인 애니메이션 이름")]
    public string spineAnim;

    [JsonProperty(Order = 6)]
    [Description("캐릭터 이름의 색")]
    public number color;

    [JsonProperty(Order = 7)]
    [Description("말풍선의 형태")]
    public number spriteDialogType;

    [JsonProperty(Order = 8)]
    [Description("텍스트 애니메이션 재생 시간, 없으면 글자수만큼 x 1/60")]
    public number textAnimDuration;

}

