const emoji = [
  {
    url: "/emoji/kiss.svg",
    encode: "[/kiss]"
  },
  {
    url: "/emoji/silent.svg",
    encode: "[/silent]"
  },
  {
    url: "/emoji/bz.svg",
    encode: "[/bz]"
  },
  {
    url: "/emoji/cool.svg",
    encode: "[/cool]"
  },
  {
    url: "/emoji/cool1.svg",
    encode: "[/cool1]"
  },
  {
    url: "/emoji/ng1.svg",
    encode: "[/ng1]"
  },
  {
    url: "/emoji/hp1.svg",
    encode: "[/hp1]"
  },
  {
    url: "/emoji/hp2.svg",
    encode: "[/hp2]"
  },
  {
    url: "/emoji/js.svg",
    encode: "[/js]"
  },
  {
    url: "/emoji/jx.svg",
    encode: "[/jx]"
  },
  {
    url: "/emoji/jy.svg",
    encode: "[/jy]"
  },
  {
    url: "/emoji/ku1.svg",
    encode: "[/ku1]"
  },
  {
    url: "/emoji/kx.svg",
    encode: "[/kx]"
  },
  {
    url: "/emoji/kx1.svg",
    encode: "[/kx1]"
  },
  {
    url: "/emoji/kx2.svg",
    encode: "[/kx2]"
  },
  {
    url: "/emoji/kz.svg",
    encode: "[/kz]"
  },
  {
    url: "/emoji/lh.svg",
    encode: "[/lh]"
  },
  {
    url: "/emoji/mb.svg",
    encode: "[/mb]"
  },
  {
    url: "/emoji/mg.svg",
    encode: "[/mg]"
  },
  {
    url: "/emoji/mm.svg",
    encode: "[/mm]"
  },
  {
    url: "/emoji/mwbq.svg",
    encode: "[/mwbq]"
  },
  {
    url: "/emoji/ng.svg",
    encode: "[/ng]"
  },
  {
    url: "/emoji/ng1.svg",
    encode: "[/ng1]"
  },
  {
    url: "/emoji/ot.svg",
    encode: "[/ot]"
  },
  {
    url: "/emoji/ot1.svg",
    encode: "[/ot1]"
  },
  {
    url: "/emoji/pb.svg",
    encode: "[/pb]"
  },
  {
    url: "/emoji/qw1.svg",
    encode: "[/qw1]"
  },
  {
    url: "/emoji/qw2.svg",
    encode: "[/qw2]"
  },
  {
    url: "/emoji/rl.svg",
    encode: "[/rl]"
  },
  {
    url: "/emoji/sb.svg",
    encode: "[/sb]"
  },
  {
    url: "/emoji/sj.svg",
    encode: "[/sj]"
  },
  {
    url: "/emoji/sk.svg",
    encode: "[/sk]"
  },
  {
    url: "/emoji/sq.svg",
    encode: "[/sq]"
  },
  {
    url: "/emoji/ss.svg",
    encode: "[/ss]"
  },
  {
    url: "/emoji/ts.svg",
    encode: "[/ts]"
  },
  {
    url: "/emoji/tsh.svg",
    encode: "[/tsh]"
  },
  {
    url: "/emoji/tsh1.svg",
    encode: "[/tsh1]"
  },
  {
    url: "/emoji/tsh2.svg",
    encode: "[/tsh2]"
  },
  {
    url: "/emoji/ty.svg",
    encode: "[/ty]"
  },
  {
    url: "/emoji/wx1.svg",
    encode: "[/wx1]"
  },
  {
    url: "/emoji/x.svg",
    encode: "[/x]"
  },
  {
    url: "/emoji/x1.svg",
    encode: "[/x1]"
  },
  {
    url: "/emoji/xk.svg",
    encode: "[/xk]"
  },
  {
    url: "/emoji/xy.svg",
    encode: "[/xy]"
  },
  {
    url: "/emoji/yh.svg",
    encode: "[/yh]"
  },
  {
    url: "/emoji/zd.svg",
    encode: "[/zd]"
  },
  {
    url: "/emoji/zd1.svg",
    encode: "[/zd1]"
  },
  {
    url: "/emoji/zj.svg",
    encode: "[/zj]"
  },
  {
    url: "/emoji/zj1.svg",
    encode: "[/zj1]"
  },
  {
    url: "/emoji/zy.svg",
    encode: "[/zy]"
  }
];

const parse = cmt => {
  const reg = /\[\/\w+\]/g;
  return cmt.replace(reg, item => {
    let temp = emoji.find(it => it.encode === item);
    return temp ? `<img src="${temp.url}"/>` : item;
  });
};

export { emoji, parse };
