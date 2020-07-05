using System;
using System.ComponentModel;
using Newtonsoft.Json;

using number = System.Double;
using boolean = System.Boolean;

[Description("현재 유저의 타운과, 건물을 비교한다.")]
public class townAndBldg : IScriptbleCondition
{
    [JsonProperty(Order = 1)]
    [Description("타운 cms ID")]
    public number town;

    [JsonProperty(Order = 2)]
    [Description("건물 타입 번호")]
    public BUILDING_TYPE bldg;

    [JsonProperty(Order = 3)]
    [Description("종교 타입 번호")]
    public RELIGION_TYPE religion;

}

