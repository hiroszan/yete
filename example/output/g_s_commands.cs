using System;
using System.ComponentModel;
using Newtonsoft.Json;

using number = System.Double;
using boolean = System.Boolean;

[Description("현재 실행중인 스크립트를 종료한다.")]
public class g_s_EndScript : IScriptbleCommand
{
}

[Description("현재 진행중인 퀘스트 노드를 완료한다.")]
public class g_s_CompleteNode : IScriptbleCommand
{
}

