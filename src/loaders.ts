interface ILoader {
  params: {
    peerId: string;
  };
}

export async function viewLoader({ params }: ILoader) {
  return {
    peerId: params.peerId,
  };
}
