using System;
using System.ComponentModel;
using Newtonsoft.Json;

using number = System.Double;
using boolean = System.Boolean;

[Description("지정된 캐릭터가 지정된 대사를 말한다.")]
public class g_c_DlgChSpeak : IScriptbleCommand
{
    [JsonProperty(Order = 1)]
    [Description("Character.json ID.")]
    public number ch;

    [JsonProperty(Order = 2)]
    [Description("지정된 대사")]
    public string dlg;

    [JsonProperty(Order = 3)]
    [Description("대사창 위치")]
    public number pos;

    [JsonProperty(Order = 4)]
    [Description("텍스트 캐릭터가 찍히는 속도 간격. 낮을수록 빠름. (default 0.1초)")]
    public number animInterval;

    [JsonProperty(Order = 5)]
    [Description("true 일 경우 이름을 ??? 으로 출력")]
    public boolean bHideName;

    [JsonProperty(Order = 6)]
    [Description("스파인 애니메이션 이름")]
    public string spineAnim;

    [JsonProperty(Order = 7)]
    [Description("캐릭터 이름의 색")]
    public number color;

    [JsonProperty(Order = 8)]
    [Description("말풍선의 형태")]
    public number spriteDialogType;

    [JsonProperty(Order = 9)]
    [Description("텍스트 애니메이션 재생 시간, 없으면 글자수만큼 x 1/60")]
    public number textAnimDuration;

}

